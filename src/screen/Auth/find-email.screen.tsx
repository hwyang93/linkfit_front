import CTAButton from '@/components/Common/CTAButton';
import Divider from '@/components/Common/Divider';
import { LinkText } from '@/components/Common/LinkText';
import RowView from '@/components/Common/RowView';
import TextField from '@/components/Common/TextField';
import DismissKeyboardView from '@/components/DismissKeyboardView';
import { useFindEmail } from '@/hooks/auth/use-find-email';
import toast from '@/hooks/toast';
import useInput from '@/hooks/use-input';
import { ROUTE } from '@/lib/constants/route';
import TOAST from '@/lib/constants/toast';
import { AuthStackParamList } from '@/navigations/auth-stack';
import common from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTE.AUTH.FIND_EMAIL>;

export const FindEmailScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(2);

  const nameInput = useInput();
  const phoneNumberInput = useInput();

  const isNameInputValid = nameInput.value.length > 0;
  const isPhonNumberInputValid = phoneNumberInput.value.length > 0;

  const findEmailMutation = useFindEmail();

  const onFindButtonPress = async () => {
    findEmailMutation.mutate(
      { name: nameInput.value, phone: phoneNumberInput.value },
      {
        onSuccess: () => {
          toast.success({ message: TOAST.VERIFICATION_CODE_SENT });
          setStep(2);
        },
      },
    );
  };

  const navigateToLoginScreen = () => {
    navigation.navigate(ROUTE.AUTH.SIGN_IN_EMAIL);
  };

  const navigateToPasswordResetScreen = () => {
    navigation.navigate(ROUTE.AUTH.PASSWORD_RESET);
  };

  return (
    <DismissKeyboardView>
      {step === 1 && (
        <View style={common.container}>
          <Text style={styles.title}>이메일 찾기</Text>
          <Text style={[styles.subtitle, common.mt16]}>
            가입한 이메일을 찾기 위해서 정보를 입력해주세요.
          </Text>
          <TextField
            style={[common.mr8, common.mt40, { flex: 1 }]}
            label="이름"
            placeholder="이름을 입력하세요."
            value={nameInput.value}
            onChangeText={nameInput.onChange}
          />
          <TextField
            style={common.mt16}
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력하세요."
            value={phoneNumberInput.value}
            onChangeText={phoneNumberInput.onChange}
          />
          <CTAButton
            style={common.mt40}
            label="가입한 이메일 찾기"
            disabled={!isNameInputValid || !isPhonNumberInputValid}
            onPress={onFindButtonPress}
          />
        </View>
      )}
      {step === 2 && (
        <View style={common.container}>
          <Text style={styles.title}>이메일 찾기</Text>
          <Text style={[styles.subtitle, common.mt16]}>가입한 이메일 찾기가 완료되었어요.</Text>
          <Divider style={{ marginTop: 24 }} />
          <Text style={{ marginTop: 24, fontSize: 20 }}>
            이메일: <Text style={{ fontWeight: '700' }}>Linkfit@gmail.com</Text>
          </Text>
          <Text style={{ marginTop: 16, fontSize: 20 }}>가입일: 2023.09.11</Text>
          <CTAButton style={common.mt40} label="로그인 하러가기" onPress={navigateToLoginScreen} />
          <RowView style={{ justifyContent: 'space-between', marginTop: 40 }}>
            <Text style={{ fontSize: 16 }}>비밀번호를 잊으셨나요?</Text>
            <LinkText style={{ fontSize: 16 }} onPress={navigateToPasswordResetScreen}>
              비밀번호 재설정
            </LinkText>
          </RowView>
        </View>
      )}
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
