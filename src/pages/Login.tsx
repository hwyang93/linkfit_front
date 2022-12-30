import React, {useCallback, useState} from 'react';
import common from '../styles/common';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input, {KeyboardTypes, ReturnKeyTypes} from '../components/Input';
import LinearGradient from 'react-native-linear-gradient';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Logo from '../components/Logo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../AppInner';

function LogIn() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const canGoNext = password;

  const onSubmit = useCallback(async () => {}, []);

  const testClick = () => {
    Alert.alert('알림', '클릭테스트에용');
  };

  const insets = useSafeAreaInsets();
  console.log(insets);

  return (
    <DismissKeyboardView
      style={[
        common.wrap,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={common.containerHeader}>
        <Logo />

        <View>
          {/* 비밀번호 입력 && 로그인 버튼 */}
          <View style={common.mt40}>
            <Input
              value={password}
              label={'비밀번호'}
              placeholder={'비밀번호를 입력해 주세요.'}
              keyboardType={KeyboardTypes.PASSWORD}
              returnKeyType={ReturnKeyTypes.DONE}
              onChangeText={(text: string) => setPassword(text.trim())}
              secureTextEntry
            />
          </View>

          <View style={common.mt30}>
            <Pressable disabled={!canGoNext || loading} onPress={onSubmit}>
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
                  <Text style={common.buttonText}>로그인</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.findPassword}>
            <Text style={styles.leftBox}>비밀번호를 잊으셨나요?</Text>
            <Pressable onPress={() => navigation.navigate('PasswordReset')}>
              <Text style={styles.rightBox}>비밀번호 재설정</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  findPassword: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },
  leftBox: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
  rightBox: {
    flex: 1,
    color: '#3962f3',
    fontSize: 16,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});

export default LogIn;