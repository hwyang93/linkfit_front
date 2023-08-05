import BoxButton from '@/components/Common/BoxButton';
import CTAButton from '@/components/Common/CTAButton';
import RowView from '@/components/Common/RowView';
import TextField from '@/components/Common/TextField';
import DismissKeyboardView from '@/components/DismissKeyboardView';
import useInput from '@/hooks/useInput';
import common from '@/styles/common';
import {StyleSheet, Text, View} from 'react-native';

const FindEmailScreen = () => {
  const emailInput = useInput();
  const verificationCodeInput = useInput();

  const isEmailInputValid = emailInput.value.length > 0;
  const isVerificationCodeInputValid = verificationCodeInput.value.length > 0;

  return (
    <DismissKeyboardView>
      <View style={common.container}>
        <Text style={styles.title}>STEP 1</Text>
        <Text style={[styles.subtitle, common.mt16]}>
          인증번호 전송을 위해서{'\n'}가입한 이메일을 입력해 주세요.
        </Text>
        <RowView style={[common.mt40, {alignItems: 'center'}]}>
          <TextField
            style={[common.mr8, {flex: 1}]}
            label="이메일"
            placeholder="name@email.com"
            value={emailInput.value}
            onChangeText={emailInput.onChange}
          />
          <BoxButton label="전송" disabled={!isEmailInputValid} />
        </RowView>
        <TextField
          style={common.mt16}
          label="인증번호"
          placeholder="인증번호 6자리를 입력하세요."
          value={verificationCodeInput.value}
          onChangeText={verificationCodeInput.onChange}
        />
        <CTAButton
          style={common.mt40}
          label="확인"
          disabled={!isEmailInputValid || !isVerificationCodeInputValid}
        />
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FindEmailScreen;
