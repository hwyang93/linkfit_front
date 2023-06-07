import {LoggedInParamList} from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import useAuth from '@/hooks/useAuth';
import Input, {KeyboardTypes, ReturnKeyTypes} from '@components/Input';
import Logo from '@components/Logo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLACK} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, 'LogIn'>;

const LogInScreen = ({navigation, route}: Props) => {
  const [password, setPassword] = useState('');

  const {signIn, isLoading} = useAuth();

  const canGoNext = password.length > 0;

  const onSubmit = async () => {
    const loginInfo = {
      email: route.params.email,
      password: password,
    };

    signIn(loginInfo);
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

export default LogInScreen;
