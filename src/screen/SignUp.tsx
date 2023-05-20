import CTAButton from '@/components/Common/CTAButton';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';
type SignInScreenProps = NativeStackScreenProps<LoggedInParamList, 'SignUp'>;

function SignUp({navigation}: SignInScreenProps) {
  const route = useRoute<RouteProp<LoggedInParamList, 'SignUp'>>();
  console.log('signup', route);
  return (
    <View style={styles.container}>
      <View style={common.mt40}>
        <Text style={common.text_l}>
          맞춤 서비스 이용을 위해{'\n'}회원 유형을 선택해 주세요.
        </Text>
      </View>

      <View style={common.mt40}>
        <CTAButton
          label="일반 회원"
          onPress={() =>
            navigation.navigate('Terms', {email: route.params.email})
          }
        />
      </View>
      <View style={common.mt16}>
        <CTAButton
          label="사업자 회원"
          variant="stroked"
          onPress={() =>
            navigation.navigate('CompanySignUpForm', {
              email: route.params.email,
            })
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default SignUp;
