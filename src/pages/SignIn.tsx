import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {RootStackParamList} from '../../AppInner';
// import {useAppDispatch} from '../store';
import {validateEmail, removeWhitespace, validatePassword} from '../util/util';
import Input, {KeyboardTypes, ReturnKeyTypes} from '../components/Input';
import useInput from '../hooks/useInput';
import common, {width} from '../styles/common';
import SimpleLogin from '../components/SimpleLogin';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../components/Logo';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  // const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  // 이메일, 비밀번호
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    navigation.navigate('LogIn');
    setIsMember(true);
    // TODO : 가입 된 이메일인지 확인 후 로그인화면 또는 회원가입 화면으로 보낸다.
  };

  // const onSubmit = useCallback(async () => {}, []);

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
    <DismissKeyboardView style={[common.wrap]}>
      <View style={common.container}>
        <Logo />

        <View>
          {/* 이메일 입력 화면 && 회원가입 여부 확인 버튼 */}
          <View style={common.mt40}>
            <Input
              {...emailInput}
              value={email}
              label={'이메일'}
              placeholder={'이메일을 입력해 주세요.'}
              keyboardType={KeyboardTypes.EMAIL}
              returnKeyType={ReturnKeyTypes.DONE}
              isEmail={isEmail}
              onChangeText={onChangeEmail}
              onSubmitEditing={checkMember}
            />
            {!isEmail && <Text style={styles.cautionText}>{emailMessage}</Text>}
          </View>

          <View style={common.mt30}>
            <Pressable disabled={!canGoNext || loading} onPress={checkMember}>
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
                  <Text style={common.buttonText}>이메일로 계속하기</Text>
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
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  cautionText: {
    paddingTop: 4,
    paddingLeft: 16,
    color: '#cc1212',
    fontSize: +width * 12,
  },
  easyLink: {
    color: '#3962f3',
    fontSize: +width * 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignIn;