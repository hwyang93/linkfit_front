import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useCallback, useState} from 'react';
import TabButton from '@components/TabButton';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {INPUT} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import LinearGradient from 'react-native-linear-gradient';
import BirthdayPicker from '@components/BirthdayPicker';
import SelectBox from '@components/SelectBox';
import {createMember} from '@api/member';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const genderData = [{value: '남자'}, {value: '여자'}];
const agencyData = ['SKT', 'KT', 'LG U+', '알뜰폰'];
const loading = false;
const canGoNext = true;

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUpFormScreen({navigation}: SignUpScreenProps) {
  const route = useRoute<RouteProp<RootStackParamList, 'LogIn'>>();

  const [email] = useState(route.params.email);
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [agency, setAgency] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const signIn = useCallback(async () => {
    const data = {
      email: email,
      password: password,
      name: userName,
      gender: gender,
      phone: phoneNumber,
    };
    await createMember(data)
      .then(() => {
        Alert.alert('회원가입이 완료되었어요!');
        navigation.navigate('SignIn');
      })
      .catch((e: {message: string}) => {
        Alert.alert(e.message);
      });
  }, [email, gender, navigation, password, phoneNumber, userName]);

  return (
    <DismissKeyboardView>
      <View style={common.container}>
        <View>
          <View style={common.mb16}>
            <Input
              label={'이름'}
              onChangeText={(text: string) => setUserName(text.trim())}
              value={userName}
              placeholder={'이름을 입력 하세요.'}
              keyboardType={KeyboardTypes.DEFAULT}
            />
          </View>
          <View style={common.mb16}>
            <BirthdayPicker />
          </View>
          <View style={[common.mb16]}>
            <TabButton
              genderData={genderData}
              onSelect={(value: any) => setGender(value)}
              value={gender}
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
            <View style={{flex: 1, marginRight: 8}}>
              <SelectBox
                data={agencyData}
                onSelect={(value: any) => setAgency(value)}
                defaultButtonText={'통신사'}
              />
            </View>
            <View style={{flex: 2}}>
              <Input
                label={'휴대폰 번호'}
                onChangeText={(text: any) => setPhoneNumber(text)}
                value={phoneNumber}
                placeholder={'01012345678'}
                keyboardType={KeyboardTypes.PHONE}
              />
            </View>
          </View>

          <View>
            <View style={common.mb16}>
              <Input
                label={'비밀번호'}
                onChangeText={(text: string) => setPassword(text.trim())}
                value={password}
                placeholder={'비밀번호를 입력하세요.'}
                keyboardType={KeyboardTypes.DEFAULT}
                secureTextEntry
              />
            </View>
          </View>

          <View style={common.mb16}>
            <Input
              label={'비밀번호 확인'}
              onChangeText={(text: string) => setPasswordConfirm(text.trim())}
              value={passwordConfirm}
              placeholder={'비밀번호를 다시한번 입력하세요.'}
              keyboardType={KeyboardTypes.DEFAULT}
              secureTextEntry
            />
          </View>

          <View style={common.mt20}>
            <Pressable onPress={signIn}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={
                  canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
                }>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  // <Text style={common.buttonText}>본인인증</Text>
                  <Text style={common.buttonText}>회원가입</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    lex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  selectBox: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: INPUT.DEFAULT,
  },
  selectText: {
    color: '#acacac',
    fontSize: 16,
    textAlign: 'left',
  },
  dropBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropItem: {
    borderBottomWidth: 1,
    borderBottomColor: INPUT.DEFAULT,
  },
  dropText: {},
  selectBoxFocus: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: INPUT.FOCUS,
  },
  selectTextFocus: {
    color: '#292929',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default SignUpFormScreen;
