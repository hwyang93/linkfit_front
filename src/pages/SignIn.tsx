import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
import {RootStackParamList} from '../../AppInner';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {validateEmail, removeWhitespace, validatePassword} from '../util/util';
import Input, {KeyboardTypes, ReturnKeyTypes} from '../components/Input';
import useInput from '../hooks/useInput';
import common, {width} from '../styles/common';
import SimpleLogin from '../components/SimpleLogin';
import LinearGradient from 'react-native-linear-gradient';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  // 이메일, 비밀번호
  const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  const emailInput = useInput('', validateEmail);
  const passwordInput = useInput('', validatePassword);

  // 오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  // 회원 가입 여부
  const [isMember, setIsMember] = useState<boolean>(false);

  const onChangeEmail = useCallback(
    (value: string) => {
      console.log(value);
      const checkEmail = removeWhitespace(value);
      setEmail(checkEmail);
      setIsEmail(validateEmail(checkEmail));
      if (!isEmail) {
        setEmailMessage('이메일 형식에 맞게 입력해 주세요.');
      } else {
        setEmailMessage('');
      }
    },
    [isEmail],
  );

  const checkMember = () => {
    Alert.alert('알림', '환영합니다. 회원님');
    // if(isMember) {}
    setIsMember(true);
  };

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    try {
      setLoading(true);
      const response = await axios.post('', {
        email,
        // password,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
    } catch (error) {
      const errorResponse = (error as AxiosError<{message: string}>).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }, [navigation, loading, dispatch, email]); // password 삭제

  // const canGoNext = email && password; // 이메일 그리고 비밀번호가 입력 되면 버튼 활성화
  // 이메일이 입력 되면 버튼 활성화
  const canGoNext = isEmail;

  // const toSignUp = useCallback(() => {
  //   navigation.navigate('SignUp');
  // }, [navigation]);

  const testClick = () => {
    Alert.alert('알림', '클릭테스트에용');
  };

  return (
    <DismissKeyboardView style={common.wrap}>
      <View style={common.container}>
        <View style={styles.logoArea}>
          <View style={styles.logoBox}>
            <Image
              source={require('../assets/images/logoText.png')}
              style={styles.logoText}
              resizeMode={'cover'}
            />
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode={'cover'}
            />
          </View>
          <Text style={[common.text, common.mt20]}>
            당신의 커리어를 위한 여정에{'\n'} Linkfit이 함께 할게요.
          </Text>
        </View>

        <View>
          {isMember ? (
            <View>
              {/* 비밀번호 입력 && 로그인 버튼 */}
              <View style={common.mt40}>
                <Input
                  {...emailInput}
                  label={'비밀번호'}
                  placeholder={'비밀번호를 입력해 주세요.'}
                  keyboardType={KeyboardTypes.PASSWORD}
                  returnKeyType={ReturnKeyTypes.DONE}
                  onChangeText={onChangeEmail}
                />
                {/*{!isEmail && (*/}
                {/*  <Text style={styles.cautionText}>{emailMessage}</Text>*/}
                {/*)}*/}
              </View>

              <View style={common.mt30}>
                <Pressable
                  disabled={!canGoNext || loading}
                  onPress={checkMember}>
                  <LinearGradient
                    style={common.button}
                    start={{x: 0.1, y: 0.5}}
                    end={{x: 0.6, y: 1}}
                    colors={
                      canGoNext
                        ? ['#74ebe4', '#3962f3']
                        : ['#dcdcdc', '#dcdcdc']
                    }>
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.buttonText}>로그인</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              </View>
              <View style={styles.findPassword}>
                <Text style={styles.leftBox}>비밀번호를 잊으셨나요?</Text>
                <Pressable onPress={testClick}>
                  <Text style={styles.rightBox}>비밀번호 재설정</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View>
              {/* 이메일 입력 화면 && 회원가입 여부 확인 버튼 */}
              <View style={common.mt40}>
                <Input
                  {...emailInput}
                  label={'이메일'}
                  placeholder={'이메일을 입력해 주세요.'}
                  keyboardType={KeyboardTypes.EMAIL}
                  returnKeyType={ReturnKeyTypes.DONE}
                  onChangeText={onChangeEmail}
                />
                {!isEmail && (
                  <Text style={styles.cautionText}>{emailMessage}</Text>
                )}
              </View>

              <View style={common.mt30}>
                <Pressable
                  disabled={!canGoNext || loading}
                  onPress={checkMember}>
                  <LinearGradient
                    style={common.button}
                    start={{x: 0.1, y: 0.5}}
                    end={{x: 0.6, y: 1}}
                    colors={
                      canGoNext
                        ? ['#74ebe4', '#3962f3']
                        : ['#dcdcdc', '#dcdcdc']
                    }>
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.buttonText}>이메일로 계속하기</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              </View>
              {/* 간편 로그인 컴포넌트 */}
              <SimpleLogin />
              {/* 간편 로그인 컴포넌트 */}
              <View>
                <Pressable onPress={testClick}>
                  <Text style={styles.easyLink}>로그인없이 둘러보기</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  logoArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: +width * 200,
  },
  logoText: {
    width: '100%',
    marginBottom: 8,
  },
  logoImage: {
    width: '100%',
    height: 58,
  },
  cautionText: {
    paddingTop: 4,
    paddingLeft: 16,
    color: '#cc1212',
    fontSize: +width * 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: +width * 16,
  },
  easyLink: {
    color: '#3962f3',
    fontSize: +width * 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  findPassword: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },
  leftBox: {
    flex: 1,
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

export default SignIn;
