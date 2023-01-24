import {Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import LinearGradient from 'react-native-linear-gradient';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignInScreenProps) {
  return (
    <View style={styles.container}>
      <View style={common.mt40}>
        <Text style={common.text_l}>
          맞춤 서비스 이용을 위해{'\n'}회원 유형을 선택해 주세요.
        </Text>
      </View>

      <View style={common.mt40}>
        <Pressable onPress={() => navigation.navigate('Terms')}>
          <LinearGradient
            style={common.button}
            start={{x: 0.1, y: 0.5}}
            end={{x: 0.6, y: 1}}
            colors={['#74ebe4', '#3962f3']}>
            <Text style={common.buttonText}>일반 회원</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={common.mt16}>
        <Pressable
          style={[
            common.button,
            {backgroundColor: WHITE, borderWidth: 1, borderColor: GRAY.DARK},
          ]}
          onPress={() => navigation.navigate('CompanySignUpForm')}>
          <Text style={[common.buttonText, {color: BLUE.DEFAULT}]}>
            사업자 회원
          </Text>
        </Pressable>
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
