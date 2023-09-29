import CTAButton from '@/components/Common/CTAButton';
import TextField, { TextFieldHelperText } from '@/components/Common/TextField';
import useInput from '@/hooks/use-input';
import { useSelect } from '@/hooks/use-select';
import { ROUTE } from '@/lib/constants/route';
import { passwordSchema } from '@/schema/form';
import { createMember } from '@api/member';
import BirthdayPicker from '@components/BirthdayPicker';
import DismissKeyboardView from '@components/DismissKeyboardView';
import { KeyboardTypes } from '@components/Input';
import SelectBox from '@components/SelectBox';
import TabButton from '@components/TabButton';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { useState } from 'react';
import { View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const GENDER_DATA = ['남자', '여자'];
const AGENCY_DATA = ['SKT', 'KT', 'LG U+', '알뜰폰'];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.AUTH.SIGN_UP_FORM>;

export const SignUpFormScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false);

  const nameInput = useInput();
  const phoneNumberInput = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();

  const isPasswordInputValid = passwordSchema.safeParse(passwordInput.value).success;
  const isPasswordConfirmInputValid = passwordInput.value === passwordConfirmInput.value;

  const passwordHelperText =
    passwordInput.value.length === 0
      ? '영문, 숫자, 특수문자 / 8자 이상'
      : isPasswordInputValid
      ? '비밀번호가 적절해요 :)'
      : '비밀번호 형식을 확인하세요.';

  const passwordConfirmHelperText =
    passwordConfirmInput.value.length === 0
      ? ''
      : isPasswordConfirmInputValid
      ? '비밀번호가 일치해요 :)'
      : '비밀번호를 확인하세요.';

  const birthSelect = useSelect();
  const genderSelect = useSelect(GENDER_DATA[0]);
  const agencySelect = useSelect();

  const signIn = async () => {
    const body = {
      email: route.params.email,
      password: passwordInput.value,
      name: nameInput.value,
      birth: birthSelect.value,
      gender: genderSelect.value,
      phone: phoneNumberInput.value,
    };

    await createMember(body)
      .then(() => {
        setLoading(true);
        toast.success({ message: '회원가입이 완료되었어요!' });
        navigation.navigate(ROUTE.AUTH.SIGN_IN_EMAIL);
        setLoading(false);
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  };

  const canGoNext =
    nameInput.value &&
    genderSelect.value &&
    birthSelect.value &&
    phoneNumberInput.value &&
    isPasswordInputValid &&
    isPasswordConfirmInputValid;

  console.log('gender', genderSelect.value);

  return (
    <DismissKeyboardView>
      <View style={common.container}>
        <View>
          <View style={common.mb16}>
            <TextField
              label="이름"
              onChangeText={nameInput.onChange}
              value={nameInput.value}
              placeholder="김링크"
              keyboardType={KeyboardTypes.DEFAULT}
            />
          </View>
          <View style={common.mb16}>
            <BirthdayPicker
              label="생년월일"
              onSelect={birthSelect.onChange}
              placeholder="2000.01.01"
              value={birthSelect.value}
            />
          </View>
          <View style={[common.mb16]}>
            <TabButton
              list={GENDER_DATA}
              onSelect={genderSelect.onChange}
              initialValue={GENDER_DATA[0]}
              value={genderSelect.value}
            />
          </View>

          <View
            style={[
              common.mb16,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <SelectBox
                data={AGENCY_DATA}
                onSelect={agencySelect.onChange}
                defaultButtonText="통신사"
              />
            </View>
            <View style={{ flex: 2 }}>
              <TextField
                label="휴대폰 번호"
                onChangeText={phoneNumberInput.onChange}
                value={phoneNumberInput.value}
                placeholder="01012345678"
                keyboardType={KeyboardTypes.PHONE}
              />
            </View>
          </View>
          <View>
            <View style={common.mb16}>
              <TextField
                label="비밀번호"
                onChangeText={passwordInput.onChange}
                value={passwordInput.value}
                placeholder="비밀번호를 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                error={passwordInput.value.length !== 0 && !isPasswordInputValid}
                secureTextEntry
              />
              <TextFieldHelperText
                variant={
                  passwordInput.value.length === 0
                    ? 'placeholder'
                    : isPasswordInputValid
                    ? 'default'
                    : 'error'
                }>
                {passwordHelperText}
              </TextFieldHelperText>
            </View>
          </View>
          <View style={common.mb16}>
            <TextField
              label="비밀번호 확인"
              onChangeText={passwordConfirmInput.onChange}
              value={passwordConfirmInput.value}
              placeholder="비밀번호를 다시한번 입력하세요."
              keyboardType={KeyboardTypes.DEFAULT}
              secureTextEntry
              error={passwordConfirmInput.value.length !== 0 && !isPasswordConfirmInputValid}
            />
            <TextFieldHelperText
              variant={
                passwordConfirmInput.value.length === 0
                  ? 'placeholder'
                  : isPasswordConfirmInputValid
                  ? 'default'
                  : 'error'
              }>
              {passwordConfirmHelperText}
            </TextFieldHelperText>
          </View>
          <View style={common.mt20}>
            <CTAButton label="회원가입" loading={loading} disabled={!canGoNext} onPress={signIn} />
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
};
