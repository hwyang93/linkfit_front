import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import common from '../styles/common';
import Input, {KeyboardTypes} from '../components/Input';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {INPUT} from '../styles/colors';
import TabButton from '../components/TabButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DismissKeyboardView from '../components/DismissKeyboardView';

type PasswordResetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordReset'
>;

function PasswordReset({}: PasswordResetScreenProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userName, setUserName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [agency, setAgency] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    setBirthday(moment(date).format('YYYY.MM.DD'));
    hideDatePicker();
  };

  const genderData = [{value: '남자'}, {value: '여자'}];
  const loading = false;
  const canGoNext = true;
  return (
    <DismissKeyboardView>
      <View style={common.containerHeader}>
        <View>
          <Text style={[common.text, common.tal]}>
            비밀번호 재설정을 위해{'\n'} 가입한 정보를 입력해 주세요.
          </Text>
        </View>
        <View style={common.mt40}>
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
            <TouchableOpacity onPress={showDatePicker}>
              <Input
                pointerEvents={'none'}
                label={'생년월일'}
                value={birthday}
                placeholder={'생년월일을 선택 하세요.'}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
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
              {flex: 0, flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View
              style={[
                {flex: 1, justifyContent: 'center'},
                common.mr8,
                common.selectWrapper,
                common.basicBox,
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  color: INPUT.DEFAULT,
                }}>
                통신사
              </Text>
              <Icon
                name="angle-down"
                size={24}
                color="black"
                style={common.selectIcon}
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
            <Pressable disabled>
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
                  <Text style={common.buttonText}>본인인증</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

export default PasswordReset;
