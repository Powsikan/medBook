/* eslint-disable prettier/prettier */
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ScreenProp = {
  navigation: NavigationProp | StackNavigationProp;
  route: RouteProp<any>;
};

export type HasMap<T> = {
  uid: string;
  value: T;
};

export type ScreenPropsType = {
  updateAuthState: (isUserLoggedIn: boolean) => void;
};
export type Group = {
  GroupName: string;
  Precedence: number;
};

export type AdminUserType = {
  Attributes: Attribute[];
  UserStatus: string;
  Username: string;
};
export type Attribute = {
  Name: string;
  Value: string;
};
