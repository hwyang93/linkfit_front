import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import common from '../styles/common';
import Input, {KeyboardTypes} from '../components/Input';

type PasswordResetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordReset'
>;

function PasswordReset({}: PasswordResetScreenProps) {
  return (
    <View style={common.containerHeader}>
      <View>
        <Text style={[common.text, common.tal]}>
          비밀번호 재설정을 위해{'\n'} 가입한 정보를 입력해 주세요.
        </Text>
      </View>
      <View style={common.mt40}>
        <Input
          label={'이름'}
          onChangeText={() => {}}
          value={'김링크'}
          placeholder={'이름을 입력 하세요.'}
          keyboardType={KeyboardTypes.DEFAULT}
          propStyles={{inputWrapper: {marginBottom: 16}}}
        />

        <Input
          label={'생년월일'}
          onChangeText={() => {}}
          value={'2000.01.01'}
          placeholder={'생년월일을 선택 하세요'}
          keyboardType={KeyboardTypes.DEFAULT}
          propStyles={{inputWrapper: {marginBottom: 16}}}
        />
      </View>
    </View>
  );
}

export default PasswordReset;
