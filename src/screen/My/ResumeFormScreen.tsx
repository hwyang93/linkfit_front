import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import BirthdayPicker from '@components/BirthdayPicker';
import TabButton from '@components/TabButton';
import SelectBox from '@components/SelectBox';
import DatePicker from '@components/DatePicker';
import {iconPath} from '@util/iconPath';

function ResumeFormScreen() {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [career, setCareer] = useState('');
  const [workType, setWorkType] = useState('');
  const [school, setSchool] = useState('');
  const [license, setLicense] = useState('');
  const [introduce, setIntroduce] = useState('');

  const genderData = [{value: '남자'}, {value: '여자'}];
  const careerData = ['필라테스', '요가'];
  const workData = ['정규직', '계약직'];

  const windowWidth = Dimensions.get('window').width;
  const columns2 = (windowWidth - 40) / 2;
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label={'제목'}
            onChangeText={(text: string) => setTitle(text)}
            value={title}
            placeholder={'이력서 제목을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'이름'}
            onChangeText={(text: string) => setName(text.trim())}
            value={name}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        {/* 생년월일  */}
        <View style={common.mb16}>
          <BirthdayPicker />
        </View>
        {/* 성별 */}
        <View style={[common.mb16]}>
          <TabButton
            genderData={genderData}
            onSelect={(value: any) => setGender(value)}
            value={gender}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'주소'}
            onChangeText={(text: string) => setAddress(text)}
            value={address}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'연락처'}
            onChangeText={(text: string) => setPhoneNumber(text.trim())}
            value={phoneNumber}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        {/* 경력 */}
        <View style={common.mb16}>
          <SelectBox
            data={careerData}
            onSelect={(value: any) => setCareer(value)}
            defaultButtonText={'포지션을 선택하세요. (ex. 필라테스)'}
          />
        </View>

        <View style={common.mb16}>
          <SelectBox
            data={workData}
            onSelect={(value: any) => setWorkType(value)}
            defaultButtonText={'근무 형태를 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <View style={common.row}>
            <View style={[common.mr8, {width: columns2}]}>
              <DatePicker label={'입사'} placeholder={'입사 년월'} />
            </View>

            <View style={{width: columns2}}>
              <DatePicker label={'퇴사'} placeholder={'퇴사 년월'} />
            </View>
          </View>
        </View>

        {/* 경력 추가 버튼*/}
        <View style={[common.row, common.mb16, {justifyContent: 'center'}]}>
          <Image source={iconPath.ADD_BUTTON} style={common.size40} />
        </View>

        {/* 학력 */}
        <View style={common.mb16}>
          <SelectBox
            data={careerData}
            onSelect={(value: any) => setCareer(value)}
            defaultButtonText={'학력을 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'학교명'}
            onChangeText={(text: string) => setSchool(text)}
            value={school}
            placeholder={'학교명을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <View style={common.row}>
            <View style={[common.mr8, {width: columns2}]}>
              <DatePicker label={'입학'} placeholder={'입학 년월'} />
            </View>

            <View style={{width: columns2}}>
              <DatePicker label={'졸업'} placeholder={'졸업 년월'} />
            </View>
          </View>
        </View>

        {/* 학력 추가 버튼 */}
        <View style={[common.row, common.mb16, {justifyContent: 'center'}]}>
          <Image source={iconPath.ADD_BUTTON} style={common.size40} />
        </View>

        {/* 자격증 */}
        <View style={common.mb16}>
          <Input
            label={'자격증'}
            onChangeText={(text: string) => setLicense(text)}
            value={license}
            placeholder={'자격증 디테일'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'소개글'}
            onChangeText={(text: string) => setIntroduce(text)}
            value={introduce}
            placeholder={'소개글을 작성해 주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default ResumeFormScreen;
