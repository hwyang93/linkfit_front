import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useCallback, useState} from 'react';
import common from '@styles/common';
import Input, {KeyboardTypes, ReturnKeyTypes} from '@components/Input';
import LinearGradient from 'react-native-linear-gradient';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Logo from '@components/Logo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {LoggedInParamList, RootStackParamList} from '../../AppInner';
import {BLACK} from '@styles/colors';
import {login} from '@api/auth';
import {fetchMemberInfo} from '@api/member';
import {useAppDispatch} from '@/store';
import userSlice from '@slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';

function LogIn() {
  const dispatch = useAppDispatch();
  const rootNavigation = useNavigation<NavigationProp<RootStackParamList>>();
  const mainNavigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LogIn'>>();

  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const canGoNext = password;

  // const onSubmit = useCallback(async () => {}, []);

  const onSubmit = async () => {
    const loginInfo = {
      email: route.params.email,
      password: password,
    };
    await login(loginInfo)
      .then(async ({data}: any) => {
        console.log(data);
        dispatch(
          userSlice.actions.setUser({
            accessToken: data.accessToken,
          }),
        );
        await EncryptedStorage.setItem('accessToken', data.accessToken);
        // await fetchMemberInfo().then({data}=>{
        //   console.log(data)
        // })
        await getMemberInfo();
      })
      .catch(() => {
        Alert.alert('로그인에 실패하였습니다.');
      });
  };
  const getMemberInfo = async () => {
    await fetchMemberInfo()
      .then(({data}: any) => {
        console.log(data);
        dispatch(
          userSlice.actions.setUser({
            name: data.name,
            email: data.email,
          }),
        );
        mainNavigation.navigate('Link');
      })
      .catch((e: {message: any}) => {
        console.log(e.message);
      });
  };
  const insets = useSafeAreaInsets();
  console.log(insets);

  return (
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
            <Pressable onPress={() => rootNavigation.navigate('PasswordReset')}>
              <Text style={styles.rightBox}>비밀번호 재설정</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
