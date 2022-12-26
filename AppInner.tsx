import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
// import {useAppDispatch} from './src/store';
import PasswordReset from './src/pages/PasswordReset';
import SignIn from './src/pages/SignIn';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Link from './src/pages/Link';
import Community from './src/pages/Community';
import Message from './src/pages/Message';
import Setting from './src/pages/Setting';
import HeaderLeft from './src/components/HeaderLeft';

export type LoggedInParamList = {
  Link: undefined;
  Message: undefined;
  Community: undefined;
  Setting: undefined;
  // Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  LogIn: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  // const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  // const isLoggedIn = true;

  return isLoggedIn ? (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '500',
        },
      }}>
      <Tab.Screen name="Link" component={Link} options={{title: '링크'}} />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{title: '커뮤니티'}}
      />
      <Tab.Screen
        name="Settings"
        component={Message}
        options={{title: '쪽지'}}
      />
      <Tab.Screen name="My" component={Setting} options={{title: 'My'}} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '500',
        },
        headerLeft: HeaderLeft,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogIn"
        component={Login}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordReset}
        options={{title: '비밀번호 재설정'}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
