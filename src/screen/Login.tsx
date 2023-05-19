import {useAppDispatch} from '@/store';
import STORAGE_KEY from '@/utils/constants/storage';
import {login} from '@api/auth';
import {fetchMemberInfo} from '@api/member';
import Input, {KeyboardTypes, ReturnKeyTypes} from '@components/Input';
import Logo from '@components/Logo';
import toast from '@hooks/toast';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import userSlice from '@slices/user';
import {BLACK} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

function LogIn() {
  const dispatch = useAppDispatch();
  const rootNavigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<LoggedInParamList, 'LogIn'>>();

  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const canGoNext = password;

  const onSubmit = async () => {
    const loginInfo = {
      email: route.params.email,
      password: password,
    };
    await login(loginInfo)
      .then(async ({data}) => {
        setLoading(true);
        dispatch(userSlice.actions.setAccessToken(data.accessToken));
        await EncryptedStorage.setItem(
          STORAGE_KEY.ACCESS_TOKEN,
          data.accessToken,
        );
        await EncryptedStorage.setItem(
          STORAGE_KEY.REFRESH_TOKEN,
          data.refreshToken,
        );
        await getMemberInfo();
        toast.success({message: '로그인이 완료되었어요!'});
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  };
  const getMemberInfo = async () => {
    await fetchMemberInfo()
      .then(({data}: any) => {
        dispatch(userSlice.actions.setUser(data));
        dispatch(userSlice.actions.setIsLoggedIn(true));
      })
      .catch((e: {message: any}) => {
        toast.error({message: e.message});
      });
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={common.container}>
          {/* 로고 컴포넌트 */}
          <Logo />
          {/* 로고 컴포넌트 */}
          <View>
            {/* 비밀번호 입력 && 로그인 버튼 */}
            <View style={common.mt40}>
              <Input
                value={password}
                label={'비밀번호'}
                placeholder={'비밀번호를 입력해 주세요.'}
                keyboardType={KeyboardTypes.DEFAULT}
                returnKeyType={ReturnKeyTypes.DONE}
                onChangeText={(text: string) => setPassword(text.trim())}
                secureTextEntry
                onSubmitEditing={onSubmit}
              />
            </View>

            <View style={common.mt30}>
              <Pressable disabled={!canGoNext || loading} onPress={onSubmit}>
                <LinearGradient
                  style={common.button}
                  start={{x: 0.1, y: 0.5}}
                  end={{x: 0.6, y: 1}}
                  colors={
                    canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
                  }>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={common.buttonText}>로그인</Text>
                  )}
                </LinearGradient>
              </Pressable>
            </View>
            <View style={styles.findPassword}>
              <Text style={styles.leftBox}>비밀번호를 잊으셨나요?</Text>
              <Pressable
                onPress={() => rootNavigation.navigate('PasswordReset')}>
                <Text style={styles.rightBox}>비밀번호 재설정</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  findPassword: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },
  leftBox: {
    flex: 1,
    color: BLACK,
    fontSize: 16,
    textAlign: 'left',
  },
  rightBox: {
    flex: 1,
    color: '#3962f3',
    fontSize: 16,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default LogIn;
