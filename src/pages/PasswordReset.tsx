import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import common from '../styles/common';
import Input, {KeyboardTypes} from '../components/Input';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {INPUT} from '../styles/colors';

type PasswordResetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PasswordReset'
>;

function PasswordReset({}: PasswordResetScreenProps) {
  const loading = false;
  const canGoNext = true;
  return (
    <ScrollView style={common.containerHeader} bounces={false}>
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
            value={''}
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
        <View
          style={[
            common.mb16,
            {flex: 0, flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View style={[{flex: 1}, common.basicBox, common.mr8]}>
            <Text>남자</Text>
          </View>
          <View style={[{flex: 1}, common.basicBox]}>
            <Text>여자</Text>
          </View>
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
              onChangeText={() => {}}
              value={''}
              placeholder={'01012345678'}
              keyboardType={KeyboardTypes.DEFAULT}
            />
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
    </ScrollView>
  );
}

export default PasswordReset;
