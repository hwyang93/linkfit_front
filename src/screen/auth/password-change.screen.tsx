import { memberApi } from '@/api/member';
import CTAButton from '@/components/Common/CTAButton';
import { LinkText } from '@/components/Common/LinkText';
import RowView from '@/components/Common/RowView';
import TextField from '@/components/Common/TextField';
import toast from '@/hooks/toast';
import { ROUTE } from '@/lib/constants/route';
import TOAST from '@/lib/constants/toast';
import { passwordSchema } from '@/schema/form';
import DismissKeyboardView from '@components/DismissKeyboardView';
import { KeyboardTypes } from '@components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
import { LoggedInParamList } from '../../../AppInner';

const formSchema = z.object({
  currentPassword: z.string().nonempty(),
  newPassword: passwordSchema,
  newPasswordConfirm: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.AUTH.PASSWORD_CHANGE>;

export const PasswordChangeScreen = ({ navigation }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: memberApi.updateMemberPassword,
  });

  const onSubmit = form.handleSubmit((data) => {
    if (changePasswordMutation.isLoading) return;

    changePasswordMutation.mutate(
      {
        password: data.currentPassword,
        newPassword: data.newPasswordConfirm,
        isCheckAuthCode: 'N',
      },
      {
        onSuccess: () => {
          toast.success({ message: TOAST.PASSWORD_RESET_SUCCESS });
          navigation.goBack();
        },
        onError: (error) => {
          if (error instanceof Error) toast.warn({ message: error.message });
        },
      },
    );
  });

  return (
    <DismissKeyboardView>
      <View style={common.container}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: '700' }}>비밀번호 변경</Text>
        </View>
        <View style={common.mt40}>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <TextField
                style={common.mb16}
                label="현재 비밀번호"
                placeholder="현재 비밀번호를 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                errorMessage="비밀번호 형식을 확인하세요."
              />
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <TextField
                style={common.mb16}
                label="새 비밀번호"
                placeholder="새로운 비밀번호를 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                errorMessage="비밀번호를 확인하세요."
              />
            )}
          />
          <Controller
            name="newPasswordConfirm"
            control={form.control}
            render={({ field }) => (
              <TextField
                label="새 비밀번호"
                placeholder="새로운 비밀번호를 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                errorMessage="비밀번호를 확인하세요."
              />
            )}
          />
        </View>
        <View style={common.mt40}>
          <CTAButton
            label="확인"
            disabled={!form.formState.isValid}
            loading={changePasswordMutation.isLoading}
            onPress={onSubmit}
          />
        </View>
        <RowView style={{ marginTop: 40, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>비밀번호를 잊으셨나요?</Text>
          <LinkText
            style={{ fontSize: 16 }}
            onPress={() => navigation.navigate(ROUTE.AUTH.PASSWORD_RESET)}>
            비밀번호 재설정
          </LinkText>
        </RowView>
      </View>
    </DismissKeyboardView>
  );
};
