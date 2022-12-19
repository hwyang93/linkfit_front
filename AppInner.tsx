import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {Axios, AxiosError} from 'axios';
import {Alert} from 'react-native';
import userSlice from './src/slices/user';
import {useAppDispatch} from './src/store';
import PasswordReset from './src/pages/PasswordReset';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Link from './src/pages/Link';
import Community from './src/pages/Community';
import Message from './src/pages/Message';
import Setting from './src/pages/Setting';

export type LoggedInParamList = {
  Link: undefined;
  Message: undefined;
  Community: undefined;
  Setting: undefined;
  // Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  // const isLoggedIn = true;

  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        console.log(response);
        return response;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originalRequest = config;
            // 토큰 재발급 하는 코드
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            const {data} = await axios.post(
              '',
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );
            // 새로운 토큰 저장
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.heders.authorization = `Bearer ${data.data.accessToken}`;
            return axios(originalRequest);
          }
          return Promise.reject(error);
        }
      },
    );
  }, [dispatch]);

  // 앱 실행 시 토큰 있으면 로그인하는 코드
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const response = await axios.post(
          '',
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
      } catch (error) {
        console.error(error);
        if (
          (error as AxiosError<{code: string}>).response?.data.code ===
          'expired'
        ) {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originalRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            // token refresh 요청
            const {data} = await axios.post(
              '', // token refresh api
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );
            // 새로운 토큰 저장
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

  return isLoggedIn ? (
    <Tab.Navigator>
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
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
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
