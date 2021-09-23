/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import {Auth, Hub} from 'aws-amplify';
import React, {Context, createContext, useEffect, useState} from 'react';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Toast} from 'native-base';
import {navigate} from '../routes/navigationRef';
import jwt_decode from 'jwt-decode';

type AuthContextType = {
  signOut: () => Promise<boolean>;
  localLogin: () => Promise<void>;
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (
    username: string,
    password: string,
    fullName: string,
    email: string,
    gender: string,
  ) => Promise<boolean>;
  confirmSignUp: (username: string, authCode: string) => Promise<boolean>;
  currentUser: CognitoUser | undefined;
  availableRoles: string[];
  isLoading: boolean;
  currentRole: string | undefined;
  switchRole: (role: 'Admin' | 'User') => boolean;
};

export const AuthContext: Context<AuthContextType> =
  createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC<React.ReactNode> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | undefined>(
    undefined,
  );
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    Hub.listen('auth', async ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          await localLogin();
          break;
        case 'signOut':
          setCurrentUser(undefined);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    localLogin();
  }, []);

  const signOut = async (): Promise<boolean> => {
    try {
      await Auth.signOut();
      setCurrentUser(undefined);
      navigate('PublicHome');
      console.debug('logout successfully');
      return true;
    } catch (error) {
      Toast.show({text: error.message, type: 'danger'});
      return false;
    }
  };

  const signIn = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      let loginUser: CognitoUser;
      const user = await Auth.signIn(username, password);

      loginUser = user;
      setCurrentUser(loginUser);
      await localLogin();

      console.debug('✅ Success');
      setIsLoading(false);
      return true;
    } catch (error) {
      Toast.show({text: error.message, type: 'danger'});
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (
    username: string,
    password: string,
    fullName: string,
    email: string,
    gender: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {email: email, gender, name: fullName},
      });
      setIsLoading(false);
      console.debug('✅ Sign-up Confirmed');
      return true;
    } catch (error) {
      Toast.show({text: error.message, type: 'danger'});
      navigate('SignUp');
      setIsLoading(false);
      return false;
    }
  };

  const confirmSignUp = async (
    username: string,
    authCode: string,
  ): Promise<boolean> => {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.debug('✅ Code confirmed');
      return true;
    } catch (error) {
      Toast.show({text: error.message, type: 'danger'});
      return false;
    }
  };

  const getMaxRole = async (roles: string[]): Promise<void> => {
    setIsLoading(true);
    console.log('ROLES', roles);
    try {
      if (roles?.includes('Admin')) {
        setCurrentRole('Admin');
      } else if (roles?.includes('User')) {
        setCurrentRole('User');
      } else {
        setAvailableRoles(['User']);
        setCurrentRole('User');
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e.message);
      setIsLoading(false);
      Toast.show({text: e.message, type: 'danger'});
      throw e;
    }
  };

  const switchRole = (role: 'Admin' | 'User'): boolean => {
    setIsLoading(true);
    try {
      if (currentRole === role) {
        setIsLoading(false);
        return false;
      }
      if (availableRoles.includes(role)) {
        setCurrentRole(role);
        setIsLoading(false);
        navigate('Home');
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (e) {
      console.error(e.message);
      setIsLoading(false);
      Toast.show({text: e.message, type: 'danger'});
      throw e;
    }
  };

  const localLogin = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await Auth.currentAuthenticatedUser()
        .then(loginUser => {
          console.log('loginuser', loginUser);
          if (loginUser) {
            setCurrentUser(loginUser);
            loginUser.getSession(function (err, session) {
              if (err) {
                alert(err);
                return;
              }
              const sessionIdInfo = jwt_decode(session.getIdToken().jwtToken);
              setAvailableRoles(sessionIdInfo['cognito:groups']);
              getMaxRole(sessionIdInfo['cognito:groups']);
            });

            setIsLoading(false);
            navigate('Home');
          }
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          navigate('PublicHome');
        });
    } catch (error) {
      setIsLoading(false);
      Toast.show({text: error.message, type: 'danger'});
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signOut,
        signIn,
        signUp,
        confirmSignUp,
        currentUser,
        availableRoles,
        localLogin,
        isLoading,
        currentRole,
        switchRole,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
