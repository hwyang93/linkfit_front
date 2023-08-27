import CTAButton from '@/components/Common/CTAButton';
import TextField from '@/components/Common/TextField';
import toast from '@/hooks/toast';
import useInput from '@/hooks/useInput';
import {AuthStackParamList} from '@/navigations/AuthStack';
import THEME from '@/styles/theme';
import {removeWhitespace, validateEmail} from '@/utils/util';
import {fetchMemberInfoByEmail} from '@api/member';
import Logo from '@components/Logo';
import SimpleLogin from '@components/SimpleLogin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const EMAIL_INVALID_ERROR_MESSAGE = '이메일 형식에 맞게 입력해 주세요.';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

const SignInScreen = ({navigation}: Props) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const email = useInput();

  const canGoNext = isEmailValid && email.value.length > 0;

  const onChangeEmail = (value: string) => {
    const trimmedEmail = removeWhitespace(value);
    email.setValue(trimmedEmail);
    setIsEmailValid(validateEmail(trimmedEmail));
  };

  const checkMember = async () => {
    setLoading(true);
    await EncryptedStorage.clear();
    try {
      const response = await fetchMemberInfoByEmail(email.value);
      if (response.data.seq) {
        toast.success({message: '환영합니다. 회원님'});
        navigation.navigate('LogIn', {email: email.value});
      } else {
        navigation.navigate('SignUp', {
          email: email.value,
        });
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

  const onFindEmailPress = () => {
    navigation.navigate('FindEmail');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={common.container}>
        <Logo />
        <View>
          <View style={common.mt40}>
            <TextField
              label="이메일"
              value={email.value}
              placeholder="이메일을 입력해 주세요."
              keyboardType="email-address"
              onChangeText={onChangeEmail}
              onSubmitEditing={checkMember}
              errorMessage={EMAIL_INVALID_ERROR_MESSAGE}
              error={!isEmailValid}
            />
          </View>
          <View style={common.mt30}>
            <CTAButton
              label="이메일로 계속하기"
              loading={loading}
              disabled={!canGoNext}
              onPress={checkMember}
            />
          </View>
          <SimpleLogin />
          <View style={{alignItems: 'center'}}>
            <Text style={styles.linkText}>로그인 없이 둘러보기</Text>
            <Text
              style={[styles.linkText, common.mt24]}
              onPress={onFindEmailPress}>
              가입한 이메일 찾기
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: THEME.PRIMARY,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
