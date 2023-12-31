import { LoggedInParamList } from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import toast from '@/hooks/toast';
import useAuth from '@/hooks/use-auth';
import useInput from '@/hooks/use-input';
import { ROUTE } from '@/lib/constants/route';
import TOAST from '@/lib/constants/toast';
import Input, { KeyboardTypes, ReturnKeyTypes } from '@components/Input';
import Logo from '@components/Logo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLACK } from '@styles/colors';
import common from '@styles/common';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.AUTH.SIGN_IN_PASSWORD>;

export const SignInPasswordScreen = ({ navigation, route }: Props) => {
  const password = useInput();

  const { signIn, isLoading } = useAuth();

  const canGoNext = password.value.length > 0;

  const onSubmit = async () => {
    const loginInfo = {
      email: route.params.email,
      password: password.value,
    };

    try {
      await signIn(loginInfo);
      toast.success({ message: TOAST.LOGIN_SUCCESS });
    } catch (error: any) {
      toast.error({ message: error.message });
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={common.container}>
          <Logo />
          <View>
            <View style={common.mt40}>
              <Input
                value={password.value}
                label="비밀번호"
                placeholder="비밀번호를 입력해 주세요."
                keyboardType={KeyboardTypes.DEFAULT}
                returnKeyType={ReturnKeyTypes.DONE}
                onChangeText={(text: string) => password.setValue(text.trim())}
                secureTextEntry
                onSubmitEditing={onSubmit}
              />
            </View>
            <View style={common.mt30}>
              <CTAButton
                label="로그인"
                loading={isLoading}
                disabled={!canGoNext}
                onPress={onSubmit}
              />
            </View>
            <View style={styles.findPassword}>
              <Text style={styles.leftBox}>비밀번호를 잊으셨나요?</Text>
              <Pressable onPress={() => navigation.navigate('PasswordReset')}>
                <Text style={styles.rightBox}>비밀번호 재설정</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  findPassword: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },
  leftBox: {
    color: BLACK,
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  rightBox: {
    color: '#3962f3',
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});
