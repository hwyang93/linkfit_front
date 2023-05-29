import CTAButton from '@/components/Common/CTAButton';
import toast from '@/hooks/toast';
import {removeWhitespace, validateEmail} from '@/utils/util';
import {fetchMemberInfoByEmail} from '@api/member';
import Input, {KeyboardTypes, ReturnKeyTypes} from '@components/Input';
import Logo from '@components/Logo';
import SimpleLogin from '@components/SimpleLogin';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LoggedInParamList} from '../../AppInner';
import useInput from '../hooks/useInput';

type SignInScreenProps = NativeStackScreenProps<LoggedInParamList, 'SignIn'>;

const EMAIL_INVALID_ERROR_MESSAGE = '이메일 형식에 맞게 입력해 주세요.';

function SignIn({navigation}: SignInScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailInput = useInput('', validateEmail);

  const isFocused = useIsFocused();

  const canGoNext = isEmailValid && email.length > 0;

  useEffect(() => {
    if (isFocused) {
      setEmail('');
    }
  }, [isFocused]);

  const onChangeEmail = useCallback((value: string) => {
    const trimmedEmail = removeWhitespace(value);
    setEmail(trimmedEmail);
    setIsEmailValid(validateEmail(trimmedEmail));
  }, []);

  const checkMember = async () => {
    setLoading(true);
    await EncryptedStorage.clear();
    try {
      const response = await fetchMemberInfoByEmail(email);
      if (response.data.seq) {
        toast.success({message: '환영합니다. 회원님'});
        navigation.navigate('LogIn', {email: email});
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={common.container}>
        {/* 로고 컴포넌트 */}
        <Logo />
        {/* 로고 컴포넌트 */}
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
              isEmail={isEmailValid}
              onChangeText={onChangeEmail}
              onSubmitEditing={checkMember}
            />
            {!isEmailValid && (
              <Text style={styles.cautionText}>
                {EMAIL_INVALID_ERROR_MESSAGE}
              </Text>
            )}
          </View>
          <View style={common.mt30}>
            <CTAButton
              label="이메일로 계속하기"
              loading={loading}
              disabled={!canGoNext}
              onPress={checkMember}
            />
          </View>
          {/* 간편 로그인 컴포넌트 */}
          <SimpleLogin />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cautionText: {
    paddingTop: 4,
    paddingLeft: 16,
    color: '#cc1212',
    fontSize: 12,
  },
  easyLink: {
    color: '#3962f3',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignIn;
