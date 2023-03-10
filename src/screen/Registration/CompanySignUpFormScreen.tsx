import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import {WHITE} from '@styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import TabButton from '@components/TabButton';
import SelectBox from '@components/SelectBox';
import BirthdayPicker from '@components/BirthdayPicker';

function SignUpFormScreen() {
  const [businessNumber, setBusinessNumber] = useState<number>();
  const [companyName, setCompanyName] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [postNumber, setPostNumber] = useState<number>();
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [birth, setBirth] = useState('');

  const [gender, setGender] = useState('');
  const [agency, setAgency] = useState('');
  const [category, setCategory] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const categoryData = ['필라테스', '요가'];
  const genderData = [{value: '남자'}, {value: '여자'}];
  const agencyData = ['SKT', 'KT', 'LG U+', '알뜰폰'];

  const [loading, setLoading] = useState<boolean>(false);
  const canGoNext = false;

  return (
    <DismissKeyboardView>
      <View style={common.container}>
        {/* 사업자 등록번호 입력 란 */}
        <View style={[common.mb16, common.rowCenter]}>
          <View style={[common.mr8, {flex: 3}]}>
            <Input
              label={'사업자 등록번호'}
              onChangeText={(text: any) => setBusinessNumber(text)}
              value={businessNumber}
              placeholder={'ex) 000-00-00000'}
              keyboardType={KeyboardTypes.PHONE}
            />
          </View>
          <Pressable style={[{flex: 1}]}>
            <LinearGradient
              style={[common.button, {height: 40}]}
              start={{x: 0.1, y: 0.5}}
              end={{x: 0.6, y: 1}}
              colors={
                canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
              }>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={[common.text_s, styles.confirm]}>확인</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
        {/* 사업자 등록번호 입력 란 끝 */}
        <View style={common.mb16}>
          <Input
            label={'상호명'}
            onChangeText={(text: string) => setCompanyName(text.trim())}
            value={companyName}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>
        <View style={common.mb16}>
          <Input
            label={'대표자 이름'}
            onChangeText={(text: string) => setOwnerName(text.trim())}
            value={ownerName}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>
        <View style={common.mb16}>
          <Input
            label={'사업자 주소'}
            onChangeText={(text: number) => setPostNumber(text)}
            value={postNumber}
            placeholder={'우편번호 자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>
        <View style={common.mb16}>
          <Input
            onChangeText={(text: string) => setCompanyAddress(text.trim())}
            value={companyAddress}
            placeholder={'주소 자동 입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        {/* 업종 */}
        <View style={common.mb16}>
          <SelectBox
            label={'업종'}
            data={categoryData}
            onSelect={(value: any) => setCategory(value)}
            defaultButtonText={'업종을 선택해주세요.'}
          />
        </View>
        {/* 생년월일  */}
        <View style={common.mb16}>
          <BirthdayPicker
            label={'생년월일'}
            onSelect={(value: any) => setBirth(value)}
            placeholder={'생년월일을 선택하세요.'}
            value={birth}
          />
        </View>
        {/* 성별 */}
        <View style={[common.mb16]}>
          <TabButton
            genderData={genderData}
            onSelect={(value: any) => setGender(value)}
            value={gender}
          />
        </View>
        {/* 통신사 */}
        <View style={[common.mb16, common.row]}>
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
        {/* 비밀번호 */}
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

        {/* 본인인증 버튼 */}
        <View style={common.mt20}>
          <Pressable onPress={() => console.log(category)}>
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
    </DismissKeyboardView>
  );
}
const styles = StyleSheet.create({
  confirm: {
    fontWeight: '700',
    color: WHITE,
  },
});
export default SignUpFormScreen;
