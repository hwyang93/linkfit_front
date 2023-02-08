import {
  ActivityIndicator,
  Platform,
  Alert,
  Pressable,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useCallback, useState} from 'react';
import TabButton from '@components/TabButton';
import DismissKeyboardView from '@components/DismissKeyboardView';
import LinearGradient from 'react-native-linear-gradient';
import BirthdayPicker from '@components/BirthdayPicker';
import SelectBox from '@components/SelectBox';
import {createMember} from '@api/member';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const genderData = [{value: '남자'}, {value: '여자'}];
const agencyData = ['SKT', 'KT', 'LG U+', '알뜰폰'];
const loading = false;
const canGoNext = true;

type SignUpScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'SignUpForm'
>;

function SignUpFormScreen({navigation}: SignUpScreenProps) {
  const route = useRoute<RouteProp<LoggedInParamList, 'SignUpForm'>>();

  const [email] = useState(route.params.email);
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState('');
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
            {Platform.OS === 'ios' ? (
              <BirthdayPicker />
            ) : (
              <Input
                label={'생년월일'}
                onChangeText={(text: any) => setBirthday(text)}
                value={birthday}
                placeholder={'YYYY.MM.DD'}
                keyboardType={KeyboardTypes.NUMBER}
              />
            )}
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

export default SignUpFormScreen;
