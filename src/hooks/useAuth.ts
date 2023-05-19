import {login} from '@/api/auth';
import {fetchMemberInfo} from '@/api/member';
import userSlice from '@/slices/user';
import {useAppDispatch} from '@/store';
import STORAGE_KEY from '@/utils/constants/storage';
import axios, {isAxiosError} from 'axios';
import {useState} from 'react';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import toast from './toast';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const initiateUser = async () => {
    try {
      const response = await fetchMemberInfo();
      dispatch(userSlice.actions.setUser(response.data));
      dispatch(userSlice.actions.setIsLoggedIn(true));
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await login({email, password});
      dispatch(userSlice.actions.setAccessToken(response.data.accessToken));
      await EncryptedStorage.setItem(
        STORAGE_KEY.ACCESS_TOKEN,
        response.data.accessToken,
      );
      await EncryptedStorage.setItem(
        STORAGE_KEY.REFRESH_TOKEN,
        response.data.refreshToken,
      );

      await initiateUser();

      toast.success({message: '로그인이 완료되었어요!'});
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
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

  return {signIn, signOut, signUp, isLoading};
};

export default useAuth;
