import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import BirthdayPicker from '@components/BirthdayPicker';
import TabButton from '@components/TabButton';
import SelectBox from '@components/SelectBox';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import CareerComponent from '@components/Resume/CareerComponent';
import EducationComponent from '@components/Resume/EducationComponent';

function ResumeFormScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [license, setLicense] = useState('');
  const [introduce, setIntroduce] = useState('');
  const genderData = [{value: '남자'}, {value: '여자'}];
  const licenseData = [''];

  const [careerForm, setCareerForm] = useState<any>([]);
  const [educationForm, setEducationForm] = useState<any>([]);

  const addCareerForm = () => {
    setCareerForm([...careerForm, {}]);
  };
  const removeCareerForm = (index: number) => {
    const newCareerForm = [...careerForm];
    newCareerForm.splice(index, 1);
    setCareerForm(newCareerForm);
  };

  const addEducationForm = () => {
    setEducationForm([...educationForm, {}]);
  };
  const removeEducationForm = (index: number) => {
    const newEducationForm = [...educationForm];
    newEducationForm.splice(index, 1);
    setEducationForm(newEducationForm);
  };

  const canGoNext = true;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        {/* 제목  */}
        <View style={common.mb16}>
          <Input
            label={'제목'}
            onChangeText={(text: string) => setTitle(text)}
            value={title}
            placeholder={'이력서 제목을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        {/* 이름 */}
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

        {/* 생년월일 */}
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

        {/* 주소 */}
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

        {/* 연락처 */}
        <View style={common.mb20}>
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
        <View style={common.mv20}>
          <CareerComponent />
        </View>

        {careerForm.map((item, index) => {
          return (
            <View key={index} style={[common.mv20ㅌ]}>
              <Pressable onPress={removeCareerForm} style={styles.removeButton}>
                <Image source={iconPath.CANCEL} style={[common.size24]} />
              </Pressable>
              <View>
                <CareerComponent />
              </View>
            </View>
          );
        })}

        {/* 경력 추가 버튼*/}
        <View style={common.mb16}>
          <Pressable onPress={addCareerForm} style={{alignSelf: 'center'}}>
            <Image source={iconPath.ADD_BUTTON} style={common.size40} />
          </Pressable>
        </View>

        {/* 학력 */}
        <View style={common.mv20}>
          <EducationComponent />
        </View>

        {educationForm.map((item, index) => {
          return (
            <View key={index} style={common.mv20}>
              <Pressable
                onPress={removeEducationForm}
                style={styles.removeButton}>
                <Image source={iconPath.CANCEL} style={[common.size24]} />
              </Pressable>
              <View>
                <EducationComponent />
              </View>
            </View>
          );
        })}

        {/* 학력 추가 버튼 */}
        <View style={common.mb16}>
          <Pressable onPress={addEducationForm} style={{alignSelf: 'center'}}>
            <Image source={iconPath.ADD_BUTTON} style={common.size40} />
          </Pressable>
        </View>

        {/* 자격증 */}
        <View style={common.mb16}>
          <SelectBox
            label={'자격증'}
            data={licenseData}
            onSelect={(value: any) => setLicense(value)}
            defaultButtonText={'자격증을 선택하세요.'}
          />
        </View>

        {/* 소개글 */}
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

        {/* 작성완료 버튼 */}
        <View style={common.mt20}>
          <Pressable disabled={!canGoNext} onPress={() => {}}>
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
                <Text style={common.buttonText}>작성 완료</Text>
              )}
            </LinearGradient>
          </Pressable>
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
  removeButton: {marginBottom: 8, alignItems: 'flex-end'},
});

export default ResumeFormScreen;
