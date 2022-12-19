import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type PasswordResetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordReset'
>;

function PasswordReset({}: PasswordResetScreenProps) {
  return (
    <View>
      <Text>비밀번호 재설정</Text>
      {}
    </View>
  );
}

export default PasswordReset;
