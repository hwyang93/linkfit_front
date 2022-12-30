import React from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import common from '../styles/common';
import Input, {KeyboardTypes} from '../components/Input';
import LinearGradient from 'react-native-linear-gradient';

type PasswordResetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordReset'
>;

function PasswordReset({}: PasswordResetScreenProps) {
  const loading = false;
  const canGoNext = true;
  return (
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
            onChangeText={() => {}}
            value={'김링크'}
            placeholder={'이름을 입력 하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>
        <View style={common.mb16}>
          <Input
            label={'생년월일'}
            onChangeText={() => {}}
            value={'2000.01.01'}
            placeholder={'생년월일을 선택 하세요'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>
        <View style={[common.mb16, {flex: 0, flexDirection: 'row'}]}>
          <View style={{backgroundColor: 'red', flex: 1}}>
            <Text>남자</Text>
          </View>
          <View style={{backgroundColor: 'yellow', flex: 1}}>
            <Text>여자</Text>
          </View>
        </View>
        <View style={[common.mb16, {flex: 0, flexDirection: 'row'}]}>
          <View style={{backgroundColor: 'red', flex: 1}}>
            <Text>통신사</Text>
          </View>
          <View style={{backgroundColor: 'yellow', flex: 1}}>
            <Text>휴대폰번호</Text>
          </View>
        </View>
        <View style={common.mb16}>
          <Input
            label={'비밀번호'}
            onChangeText={() => {}}
            value={''}
            placeholder={'비밀번호를 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>
        <View style={common.mb16}>
          <Input
            label={'비밀번호 확인'}
            onChangeText={() => {}}
            value={''}
            placeholder={'비밀번호를 다시한번 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
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
  );
}

export default PasswordReset;
