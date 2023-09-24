import { LoggedInParamList } from '@/../AppInner';
import BottomSheet, { BottomSheetCTAContainer } from '@/components/Common/BottomSheet';
import CTAButton from '@/components/Common/CTAButton';
import { useUnregister } from '@/hooks/member/use-unregister';
import useAuth from '@/hooks/use-auth';
import useModal from '@/hooks/use-modal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, WHITE } from '@styles/colors';
import common from '@styles/common';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, 'Account'>;

const AccountScreen = ({ navigation }: Props) => {
  const unregisterModal = useModal();

  const { user, signOut } = useAuth();

  const unregisterMutation = useUnregister();

  const onUnregisterButtonClick = () => {
    unregisterMutation.mutate(user.seq, {
      onSuccess: () => signOut(),
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable style={common.mv20} onPress={() => navigation.navigate('PasswordReset')}>
          <Text style={[common.text_m, styles.linkText]}>비밀번호 재설정</Text>
        </Pressable>
        <Pressable style={common.mv20} onPress={unregisterModal.open}>
          <Text style={[common.text_m, styles.linkText]}>회원 탈퇴</Text>
        </Pressable>
      </View>
      <BottomSheet
        title="회원 탈퇴 하시겠습니까?"
        visible={unregisterModal.visible}
        onDismiss={unregisterModal.close}>
        <BottomSheetCTAContainer>
          <CTAButton label="탈퇴하기" onPress={onUnregisterButtonClick} />
          <CTAButton
            style={{ marginTop: 16 }}
            variant="stroked"
            label="취소"
            onPress={unregisterModal.close}
          />
        </BottomSheetCTAContainer>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: WHITE },
  linkText: {
    color: BLUE.DEFAULT,
    textDecorationLine: 'underline',
    textDecorationColor: BLUE.DEFAULT,
  },
});

export default AccountScreen;
