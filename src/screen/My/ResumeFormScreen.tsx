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
import {Key, useCallback, useEffect, useState} from 'react';
import BirthdayPicker from '@components/BirthdayPicker';
import TabButton from '@components/TabButton';
import SelectBox from '@components/SelectBox';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import CareerComponent from '@components/Resume/CareerComponent';
import EducationComponent from '@components/Resume/EducationComponent';
import {useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import {fetchMemberLicences} from '@api/member';
import toast from '@hooks/toast';

const GENDER_DATA = [{value: '남자'}, {value: '여자'}];
function ResumeFormScreen() {
  const memberInfo = useSelector((state: RootState) => state.user);
  console.log(memberInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState(memberInfo.name);
  const [birth, setBirth] = useState(memberInfo.birth);
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(memberInfo.phone);
  const [licenseSeq, setLicenseSeq] = useState(0);
  const [introduce, setIntroduce] = useState('');
  const [licenses, setLicenses] = useState([]);
  // const licenseData = [''];

  const [careers, setCareers] = useState<any>([{}]);
  const [educations, setEducations] = useState<any>([{}]);

  useEffect(() => {
    fetchMemberLicences()
      .then(({data}: any) => {
        console.log('licence::::::::');
        setLicenses(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  const addCareerForm = () => {
    setCareers([...careers, {}]);
  };
  const removeCareerForm = (index: any) => {
    const newCareerForm = [...careers];
    newCareerForm.splice(index, 1);
    setCareers(newCareerForm);
  };

  const addEducationForm = () => {
    setEducations([...educations, {}]);
  };
  const removeEducationForm = (index: any) => {
    const newEducationForm = [...educations];
    newEducationForm.splice(index, 1);
    setEducations(newEducationForm);
  };

  const handleCareers = (value: string, type: string, index: number) => {
    const newCareers = careers;
    newCareers[index][type] = value;
    setCareers(newCareers);
  };

  const handleEducations = (value: string, type: string, index: number) => {
    const newEducations = educations;
    newEducations[index][type] = value;
    setEducations(newEducations);
  };

  const onCreateResume = useCallback(() => {
    const data = {
      title: title,
      name: name,
      birth: birth,
      address: address,
      addressDetail: address,
      intro: introduce,
      hopePay: 'string',
      hopeArea: 'string',
      hopeTime: 'string',
      hopeWorkType: 'string',
      isMaster: 'N',
      isOpen: 'N',
      careers: careers,
      educations: educations,
    };
    console.log(data);
  }, [address, birth, careers, educations, introduce, name, title]);

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
          {/*<BirthdayPicker*/}
          {/*  label={'생년월일'}*/}
          {/*  onSelect={(value: any) => setBirth(value)}*/}
          {/*  placeholder={'자동입력'}*/}
          {/*  value={birth}*/}
          {/*  disabled={true}*/}
          {/*/>*/}
          <Input
            label={'생년월일'}
            value={birth}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
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

        {/* 성별 */}
        <View style={[common.mb16]}>
          <TabButton
            genderData={GENDER_DATA}
            onSelect={(value: any) => setGender(value)}
            value={gender}
          />
        </View>

        {/* 경력 */}
        {careers.map((item: any, index: number) => {
          return (
            <View key={index} style={[common.mv20]}>
              {index !== 0 && (
                <Pressable
                  onPress={removeCareerForm}
                  style={styles.removeButton}>
                  <Image source={iconPath.CANCEL} style={[common.size24]} />
                </Pressable>
              )}

              <View>
                <CareerComponent
                  onSelectPosition={(value: string) =>
                    handleCareers(value, 'field', index)
                  }
                  onSelectWorkType={(value: string) =>
                    handleCareers(value, 'workType', index)
                  }
                  onSelectStartDate={(value: string) =>
                    handleCareers(value, 'startDate', index)
                  }
                  onSelectEndDate={(value: string) =>
                    handleCareers(value, 'endDate', index)
                  }
                />
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
        {educations.map((item: any, index: number) => {
          return (
            <View key={index} style={common.mv20}>
              {index !== 0 && (
                <Pressable
                  onPress={removeEducationForm}
                  style={styles.removeButton}>
                  <Image source={iconPath.CANCEL} style={[common.size24]} />
                </Pressable>
              )}

              <View>
                <EducationComponent
                  onSelectSchool={(value: string) =>
                    handleEducations(value, 'school', index)
                  }
                  onSelectMajor={(value: string) =>
                    handleEducations(value, 'major', index)
                  }
                  onSelectStartDate={(value: string) =>
                    handleEducations(value, 'startDate', index)
                  }
                  onSelectEndDate={(value: string) =>
                    handleEducations(value, 'endDate', index)
                  }
                  onSelectStatus={(value: string) =>
                    handleEducations(value, 'status', index)
                  }
                />
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
            data={licenses}
            onSelect={(value: any) => setLicenseSeq(value.seq)}
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
          <Pressable disabled={!canGoNext} onPress={onCreateResume}>
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
