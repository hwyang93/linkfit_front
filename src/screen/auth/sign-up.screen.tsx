import CTAButton from '@/components/Common/CTAButton';
import { ROUTE } from '@/lib/constants/route';
import { AuthStackParamList } from '@/navigations/auth-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTE.AUTH.SIGN_UP>;

export const SignUpScreen = ({ navigation, route }: Props) => {
  return (
    <View style={styles.container}>
      <View style={common.mt40}>
        <Text style={common.text_l}>맞춤 서비스 이용을 위해{'\n'}회원 유형을 선택해 주세요.</Text>
      </View>

      <View style={common.mt40}>
        <CTAButton
          label="일반 회원"
          onPress={() =>
            navigation.navigate(ROUTE.AUTH.TERMS_AGREEMENT, {
              email: route.params.email,
              isCompany: false,
            })
          }
        />
      </View>
      <View style={common.mt16}>
        <CTAButton
          label="사업자 회원"
          variant="stroked"
          onPress={() =>
            navigation.navigate(ROUTE.AUTH.TERMS_AGREEMENT, {
              email: route.params.email,
              isCompany: true,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
