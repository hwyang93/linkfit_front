import BoxButton from '@/components/Common/BoxButton';
import CTAButton from '@/components/Common/CTAButton';
import RowView from '@/components/Common/RowView';
import TextField from '@/components/Common/TextField';
import { useCheckEmailVerificationCode } from '@/hooks/auth/use-check-email-verication-code';
import { useResetPassword } from '@/hooks/auth/use-reset-password';
import { useSendEmailVerificationCode } from '@/hooks/auth/use-send-email-verification-code';
import toast from '@/hooks/toast';
import useInput from '@/hooks/use-input';
import { emailSchema, verificationCodeSchema } from '@/schema/form';
import { ROUTE } from '@/utils/constants/route';
import TOAST from '@/utils/constants/toast';
import DismissKeyboardView from '@components/DismissKeyboardView';
import { KeyboardTypes } from '@components/Input';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.AUTH.PASSWORD_RESET>;

export const PasswordResetScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(1);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const emailInput = useInput();
  const verificationCodeInput = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();

  const isEmailInputValid = emailSchema.safeParse(emailInput.value).success;
  const isVerificationCodeInputValid = verificationCodeSchema.safeParse(
    verificationCodeInput.value,
  ).success;

  const isPasswordInputValid = passwordInput.value.length > 0;
  const isPasswordConfirmInputValid = passwordConfirmInput.value === passwordInput.value;

  const sendEmailVerificationCode = useSendEmailVerificationCode();
  const checkEmailVerificationCode = useCheckEmailVerificationCode();
  const resetPassword = useResetPassword();

  const onSendButtonPress = async () => {
    if (sendEmailVerificationCode.isLoading) return;

    sendEmailVerificationCode.mutate(
      { email: emailInput.value },
      {
        onSuccess: () => {
          toast.success({ message: TOAST.VERIFICATION_CODE_SENT });
          setVerificationCodeSent(true);
        },
        onError: () => {
          toast.warn({ message: TOAST.EMAIL_NOT_FOUND });
        },
      },
    );
  };

  const onResendButtonPress = () => {
    if (sendEmailVerificationCode.isLoading) return;

    sendEmailVerificationCode.mutate(
      { email: emailInput.value },
      {
        onSuccess: () => {
          toast.success({ message: TOAST.VERIFICATION_CODE_RESENT });
        },
      },
    );
  };

  const onVerifyButtonPress = () => {
    if (checkEmailVerificationCode.isLoading) return;

    checkEmailVerificationCode.mutate(
      {
        email: emailInput.value,
        authNumber: verificationCodeInput.value,
      },
      {
        onSuccess: () => {
          setStep(2);
        },
        onError: (error) => {
          if (error instanceof Error) toast.warn({ message: error.message });
        },
      },
    );
  };

  const onResetButtonPress = () => {
    if (resetPassword.isLoading) return;

    // TODO: 비밀번호 재설정 기능 추가
    resetPassword.mutate(
      {
        email: emailInput.value,
        password: '기존 패스워드',
        newPassword: passwordInput.value,
        isCheckAuthCode: 'Y',
      },
      {
        onSuccess: () => {
          toast.success({ message: TOAST.PASSWORD_RESET_SUCCESS });
          navigation.navigate('Account');
        },
        onError: (error) => {
          if (error instanceof Error) toast.warn({ message: error.message });
        },
      },
    );
  };

  return (
    <DismissKeyboardView>
      <View style={common.container}>
        {step === 1 && (
          <>
            <View>
              <Text style={{ fontSize: 24, fontWeight: '700' }}>STEP 1</Text>
              <Text style={[common.text_m, common.tal, common.mt16]}>
                인증번호 전송을 위해서{'\n'}가입한 이메일을 입력해 주세요.
              </Text>
            </View>
            <View style={common.mt40}>
              <View style={common.mb16}>
                <RowView style={{ alignItems: 'center' }}>
                  <TextField
                    style={[common.mr8, { flex: 1 }]}
                    label="이메일"
                    onChangeText={emailInput.onChange}
                    value={emailInput.value}
                    placeholder="name@email.com"
                    keyboardType={KeyboardTypes.DEFAULT}
                    error={emailInput.value.length !== 0 && !isEmailInputValid}
                    errorMessage="이메일 형식에 맞게 입력해 주세요."
                    editable={!verificationCodeSent}
                  />
                  {!verificationCodeSent ? (
                    <BoxButton
                      label="전송"
                      onPress={onSendButtonPress}
                      disabled={!isEmailInputValid}
                      loading={sendEmailVerificationCode.isLoading}
                    />
                  ) : (
                    <BoxButton label="재전송" onPress={onResendButtonPress} />
                  )}
                </RowView>
              </View>
              <View>
                {verificationCodeSent && (
                  <TextField
                    label="인증번호"
                    placeholder="인증번호 6자리를 입력하세요."
                    value={verificationCodeInput.value}
                    onChangeText={verificationCodeInput.onChange}
                    error={
                      verificationCodeInput.value.length !== 0 && !isVerificationCodeInputValid
                    }
                    errorMessage="인증번호 자릿수를 확인하세요."
                  />
                )}
              </View>
            </View>
            <View style={common.mt40}>
              <CTAButton
                label="확인"
                onPress={onVerifyButtonPress}
                disabled={!isEmailInputValid || !isVerificationCodeInputValid}
              />
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <View>
              <Text style={{ fontSize: 24, fontWeight: '700' }}>STEP 2</Text>
              <Text style={[common.text_m, common.tal, common.mt16]}>
                새로운 비밀번호를 입력해 주세요.
              </Text>
            </View>
            <View style={common.mt40}>
              <TextField
                style={common.mb16}
                label="비밀번호"
                placeholder="비밀번호를 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                secureTextEntry
                value={passwordInput.value}
                onChangeText={passwordInput.onChange}
                errorMessage="비밀번호 형식을 확인하세요."
              />
              <TextField
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 한번 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                secureTextEntry
                value={passwordConfirmInput.value}
                onChangeText={passwordConfirmInput.onChange}
                errorMessage="비밀번호를 확인하세요."
              />
            </View>
            <View style={common.mt40}>
              <CTAButton
                label="비밀번호 재설정"
                disabled={!isPasswordInputValid || !isPasswordConfirmInputValid}
                onPress={onResetButtonPress}
              />
            </View>
          </>
        )}
      </View>
    </DismissKeyboardView>
  );
};
