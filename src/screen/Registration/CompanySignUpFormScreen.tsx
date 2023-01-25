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
import {INPUT, WHITE} from '@styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function SignUpFormScreen() {
  const [businessNumber, setBusinessNumber] = useState<number>();
  const [companyName, setCompanyName] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [postNumber, setPostNumber] = useState<number>();
  const [companyAddress, setCompanyAddress] = useState<string>('');

  const [category, setCategory] = useState('');
  const [focus, setFocus] = useState(false);

  const categoryData = ['필라테스', '요가'];

  const [loading, setLoading] = useState<boolean>(false);
  const canGoNext = false;
  // todo : 사업자 등록번호 형식에 맞게 입력하면 disable 해제,
  // todo : 사업자 등록번호가 등록된 번호 일 경우

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
        <View style={{flex: 1}}>
          <SelectDropdown
            data={categoryData}
            onSelect={selectedItem => {
              setCategory(selectedItem);
              console.log('selected : ', selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item;
            }}
            defaultButtonText={'업종'}
            buttonStyle={focus ? styles.selectBoxFocus : styles.selectBox}
            buttonTextStyle={focus ? styles.selectTextFocus : styles.selectText}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#acacac'}
                  size={16}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropBox}
            rowStyle={styles.dropItem}
            rowTextStyle={styles.dropText}
            onFocus={() => setFocus(true)}
          />
        </View>
        {/*  */}
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
