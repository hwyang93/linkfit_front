import CTAButton from '@/components/Common/CTAButton';
import TextField from '@/components/Common/TextField';
import toast from '@/hooks/toast';
import useInput from '@/hooks/useInput';
import {AuthStackParamList} from '@/navigations/AuthStack';
import {removeWhitespace, validateEmail} from '@/utils/util';
import {fetchMemberInfoByEmail} from '@api/member';
import Logo from '@components/Logo';
import SimpleLogin from '@components/SimpleLogin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
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
      console.log(response);
      if (response.data.seq) {
        toast.success({message: '환영합니다. 회원님'});
        navigation.navigate('LogIn', {email: email.value});
      } else {
        navigation.navigate('SignUp', {
          email: email.value,
        });
      }
    } catch (error) {
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
