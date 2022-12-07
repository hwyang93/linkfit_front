import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  // TextInput,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios, {AxiosError} from 'axios';
// import Config from 'react-native-config';
import {RootStackParamList} from '../../AppInner';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {validateEmail, removeWhitespace} from '../util/util';
import Input, {KeyboardTypes, ReturnKeyTypes} from '../components/Input';
import useInput from '../hooks/useInput';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  // 이메일, 비밀번호
  const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const emailRef = useRef<TextInput | null>(null);
  // const passwordRef = useRef<TextInput | null>(null);
  const emailInput = useInput('');

  // 오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);

  // const onChangeEmail = useCallback((text: string) => {
  //   setEmail(text.trim());
  // }, []);

  const onChangeEmail = useCallback(
    (value: string) => {
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
  }, [loading, dispatch, email]); // password 삭제

  // const canGoNext = email && password; // 이메일 그리고 비밀번호가 입력 되면 버튼 활성화
  // 이메일이 입력 되면 버튼 활성화
  const canGoNext = email;

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.container}>
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

          <Text style={styles.titleText}>
            당신의 커리어를 위한 여정에{'\n'} Linkfit이 함께 할게요.
          </Text>
        </View>

        <Input
          {...emailInput}
          label={'이메일'}
          placeholder={'이메일을 입력해 주세요.'}
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          emailMessage={emailMessage}
          onChangeText={onChangeEmail}
        />

        {/*<View style={styles.inputWrapper}>*/}
        {/*  <Text style={styles.label}>이메일</Text>*/}
        {/*  <TextInput*/}
        {/*    style={styles.textInput}*/}
        {/*    onChangeText={onChangeEmail}*/}
        {/*    placeholder="이메일을 입력해주세요"*/}
        {/*    placeholderTextColor="#666"*/}
        {/*    importantForAutofill="yes"*/}
        {/*    autoComplete="email"*/}
        {/*    textContentType="emailAddress"*/}
        {/*    value={email}*/}
        {/*    returnKeyType="next"*/}
        {/*    clearButtonMode="while-editing"*/}
        {/*    ref={emailRef}*/}
        {/*    onSubmitEditing={() => passwordRef.current?.focus()}*/}
        {/*    blurOnSubmit={false}*/}
        {/*    autoCapitalize="none"*/}
        {/*  />*/}
        {/*  <Text style={styles.cautionText}>{emailMessage}</Text>*/}
        {/*</View>*/}

        {/*<View style={styles.inputWrapper}>*/}
        {/*  <Text style={styles.label}>비밀번호</Text>*/}
        {/*  <TextInput*/}
        {/*    style={styles.textInput}*/}
        {/*    placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"*/}
        {/*    placeholderTextColor="#666"*/}
        {/*    importantForAutofill="yes"*/}
        {/*    onChangeText={onChangePassword}*/}
        {/*    value={password}*/}
        {/*    autoComplete="password"*/}
        {/*    textContentType="password"*/}
        {/*    secureTextEntry*/}
        {/*    returnKeyType="send"*/}
        {/*    clearButtonMode="while-editing"*/}
        {/*    ref={passwordRef}*/}
        {/*    onSubmitEditing={onSubmit}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={styles.buttonArea}>
          <Pressable
            style={
              canGoNext
                ? StyleSheet.compose(
                    styles.loginButton,
                    styles.loginButtonActive,
                  )
                : styles.loginButton
            }
            disabled={!canGoNext || loading}
            onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>이메일로 계속하기</Text>
            )}
          </Pressable>
          {/*<Pressable onPress={toSignUp}>*/}
          {/*  <Text>회원가입하기</Text>*/}
          {/*</Pressable>*/}
        </View>
        <View style={styles.easyLoginArea}>
          <Text style={styles.easyText}>간편 로그인</Text>
          <View style={styles.iconBox}>
            <View style={styles.easyIcon}>
              <Pressable>
                <Image
                  source={require('../assets/images/icon/Kakaotalk.png')}
                  style={styles.icon}
                  resizeMode={'cover'}
                />
              </Pressable>
            </View>
            <View style={styles.easyIcon}>
              <Pressable>
                <Image
                  source={require('../assets/images/icon/Naver.png')}
                  style={styles.icon}
                  resizeMode={'cover'}
                />
              </Pressable>
            </View>
            <View style={styles.easyIcon}>
              <Pressable>
                <Image
                  source={require('../assets/images/icon/Google.png')}
                  style={styles.icon}
                  resizeMode={'cover'}
                />
              </Pressable>
            </View>
            <View style={styles.easyIcon}>
              <Pressable>
                <Image
                  source={require('../assets/images/icon/Apple.png')}
                  style={styles.icon}
                  resizeMode={'cover'}
                />
              </Pressable>
            </View>
          </View>
          <Text style={styles.easyLink}>로그인없이 둘러보기</Text>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  logoArea: {
    flex: 1,
    marginTop: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: 200,
  },
  logoText: {
    width: '100%',
    marginBottom: 8,
  },
  logoImage: {
    width: '100%',
    height: 58,
  },
  titleText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonArea: {
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  easyLoginArea: {
    marginTop: 40,
  },
  easyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  icon: {
    width: 40,
    height: 40,
  },
  easyIcon: {
    marginHorizontal: 8,
  },
  easyLink: {
    marginTop: 40,
    color: '#3962f3',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
