import { login } from '@/api/auth';
import { fetchMemberInfo } from '@/api/member';
import userSlice from '@/slices/user';
import { useAppDispatch, useAppSelector } from '@/store';
import STORAGE_KEY from '@/utils/constants/storage';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const initiateUser = async () => {
    const response = await fetchMemberInfo();
    dispatch(userSlice.actions.setUser(response.data));
    dispatch(userSlice.actions.setIsLoggedIn(true));
  };

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      dispatch(userSlice.actions.setAccessToken(response.data.accessToken));
      await EncryptedStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, response.data.accessToken);
      await EncryptedStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, response.data.refreshToken);

      await initiateUser();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await EncryptedStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    await EncryptedStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    dispatch(userSlice.actions.setIsLoggedIn(false));
  };

  const signUp = async ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    const response = await axios.post('', {
      email,
      name,
      password,
    });
    console.log(response);
    Alert.alert('알림', '회원가입 되었습니다.');
  };

  return { user, signIn, signOut, signUp, isLoading };
};

export default useAuth;
