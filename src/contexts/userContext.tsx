/* eslint-disable prettier/prettier */
import React, {Context, createContext, useState} from 'react';
import {
  CreateUserInput,
  CreateUserMutation,
  DeleteUserMutation,
  GetUserQuery,
  ListUsersQuery,
  ListUsersQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  User,
} from '../API';
import {GraphQLAPI} from '@aws-amplify/api-graphql';
import {getUser, listUsers} from '../graphql/queries';
import {createUser, deleteUser, updateUser} from '../graphql/mutations';
import prepareForUpdate from '../utils/prepareForUpdate';
import {Toast} from 'native-base';

type UserContextType = {
  onGetUsers: (variables: ListUsersQueryVariables) => Promise<{
    users: User[];
    nextToken: string | null | undefined;
  }>;
  onGetUser: (id: string) => Promise<User>;
  onCreateUser: (createUserInput: CreateUserInput) => Promise<User>;
  onUpdateUser: (updateUserInput: UpdateUserInput) => Promise<User>;
  onDeleteUser: (id: string) => Promise<string | undefined>;
  isLoading: boolean;
};

export const UserContext: Context<UserContextType> =
  createContext<UserContextType>({} as UserContextType);

const UserProvider: React.FC<React.ReactNode> = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onGetUsers = async (
    variables: ListUsersQueryVariables,
  ): Promise<{
    users: User[];
    nextToken: string | null | undefined;
  }> => {
    setIsLoading(true);
    try {
      const _listUsers = (await GraphQLAPI.graphql({
        query: listUsers,
        variables,
      })) as {data: ListUsersQuery};
      const users = _listUsers.data.listUsers?.items as User[];
      setIsLoading(false);
      return {users, nextToken: _listUsers.data.listUsers?.nextToken};
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      throw e;
    }
  };

  const onGetUser = async (id: string): Promise<User> => {
    try {
      const user = (await GraphQLAPI.graphql({
        query: getUser,
        variables: {id: id},
      })) as {data: GetUserQuery};
      return user.data.getUser as User;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onCreateUser = async (
    createUserInput: CreateUserInput,
  ): Promise<User> => {
    try {
      const newUser = (await GraphQLAPI.graphql({
        query: createUser,
        variables: {input: createUserInput},
      })) as {data: CreateUserMutation};
      return newUser.data.createUser as User;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onUpdateUser = async (
    updateUserInput: UpdateUserInput,
  ): Promise<User> => {
    try {
      prepareForUpdate(updateUserInput);
      const user = (await GraphQLAPI.graphql({
        query: updateUser,
        variables: {input: updateUserInput},
      })) as {data: UpdateUserMutation};
      Toast.show({text: 'User updated successfully', type: 'success'});
      return user.data.updateUser as User;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onDeleteUser = async (id: string): Promise<string | undefined> => {
    try {
      const deletedUser = (await GraphQLAPI.graphql({
        query: deleteUser,
        variables: {input: {id}},
      })) as {data: DeleteUserMutation};
      return deletedUser.data.deleteUser?.id;
    } catch (e) {
      console.error(e.errors);
      throw e;
    }
  };

  return (
    <UserContext.Provider
      value={{
        onGetUser,
        onCreateUser,
        onDeleteUser,
        onGetUsers,
        onUpdateUser,
        isLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
