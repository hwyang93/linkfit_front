import {createMember} from '@api/member';
import BirthdayPicker from '@components/BirthdayPicker';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import SelectBox from '@components/SelectBox';
import TabButton from '@components/TabButton';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {useCallback, useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LoggedInParamList} from '../../../AppInner';

const GENDER_DATA = [{value: '남자'}, {value: '여자'}];
const AGENCY_DATA = ['SKT', 'KT', 'LG U+', '알뜰폰'];

type Props = NativeStackScreenProps<LoggedInParamList, 'SignUpForm'>;

const SignUpFormScreen = ({navigation, route}: Props) => {
  const [loading, setLoading] = useState(false);
  const [email] = useState(route.params.email);
  const [userName, setUserName] = useState('');
  const [birth, setBirth] = useState('');
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
      birth: birth,
      gender: gender,
      phone: phoneNumber,
    };
    await createMember(data)
      .then(() => {
        setLoading(true);
        toast.success({message: '회원가입이 완료되었어요!'});
        navigation.navigate('SignIn');
        setLoading(false);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, [email, birth, gender, navigation, password, phoneNumber, userName]);

  const canGoNext =
    userName && gender && birth && phoneNumber && password && passwordConfirm;

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
            <BirthdayPicker
              label={'생년월일'}
              onSelect={(value: any) => setBirth(value)}
              placeholder={'생년월일을 선택하세요.'}
              value={birth}
            />
          </View>
          <View style={[common.mb16]}>
            <TabButton
              genderData={GENDER_DATA}
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
                data={AGENCY_DATA}
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
            <Pressable disabled={!canGoNext} onPress={signIn}>
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
                  <Text style={common.buttonText}>회원가입</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

export default SignUpFormScreen;
