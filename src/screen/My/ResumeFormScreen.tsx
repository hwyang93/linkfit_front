import CTAButton from '@/components/Common/CTAButton';
import { useMemberLicenceListQuery } from '@/hooks/member/useMemberLicenceListQuery';
import { useCreateResumeMutation } from '@/hooks/resume/useCreateResumeMutation';
import useInput from '@/hooks/useInput';
import { useAppSelector } from '@/store';
import { iconPath } from '@/utils/iconPath';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, { KeyboardTypes } from '@components/Input';
import CareerComponent from '@components/Resume/CareerComponent';
import EducationComponent from '@components/Resume/EducationComponent';
import SelectBox from '@components/SelectBox';
import TabButton from '@components/TabButton';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const GENDER_DATA = [{ value: '남자' }, { value: '여자' }];

type Props = NativeStackScreenProps<LoggedInParamList, 'ResumeForm'>;

const ResumeFormScreen = ({ navigation }: Props) => {
  const [licenseSeq, setLicenseSeq] = useState(0);
  const [careers, setCareers] = useState<any>([{}]);
  const [educations, setEducations] = useState<any>([{}]);

  const memberInfo = useAppSelector((state) => state.user);

  const introduceInput = useInput();
  const genderInput = useInput();
  const addressInput = useInput();
  const titleInput = useInput();
  const nameInput = useInput(memberInfo.name);
  const birthInput = useInput(memberInfo.birth);
  const phoneNumberInput = useInput(memberInfo.phone);

  const memberLicenceListQuery = useMemberLicenceListQuery();
  const licences = memberLicenceListQuery.data;

  const createResumeMutation = useCreateResumeMutation();

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

  const selectLicence = (index: number) => {
    if (licences && index !== undefined) {
      setLicenseSeq(licences[index]?.seq);
    }
  };

  const onCreateResume = () => {
    const data = {
      title: titleInput.value,
      name: nameInput.value,
      birth: birthInput.value,
      address: addressInput.value,
      addressDetail: addressInput.value,
      intro: introduceInput.value,
      hopePay: 'string',
      hopeArea: 'string',
      hopeTime: 'string',
      hopeWorkType: 'string',
      isMaster: 'N',
      isOpen: 'N',
      careers: careers,
      educations: educations,
      licenceSeq: licenseSeq,
    };

    createResumeMutation.mutate(data, {
      onSuccess: () => {
        toast.success({ message: '이력서 등록이 완료되었어요!' });
        navigation.goBack();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error({ message: error.message });
        }
      },
    });
  };

  const formValid =
    titleInput.value &&
    nameInput.value &&
    birthInput.value &&
    addressInput.value &&
    phoneNumberInput.value &&
    introduceInput.value &&
    genderInput.value;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label="제목"
            onChangeText={titleInput.onChange}
            value={titleInput.value}
            placeholder="이력서 제목을 입력하세요."
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>
        <View style={common.mb16}>
          <Input
            label="이름"
            onChangeText={nameInput.onChange}
            value={nameInput.value}
            placeholder="자동입력"
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>
        <View style={common.mb16}>
          {/*<BirthdayPicker*/}
          {/*  label={'생년월일'}*/}
          {/*  onSelect={(value: any) => setBirth(value)}*/}
          {/*  placeholder={'자동입력'}*/}
          {/*  value={birth}*/}
          {/*  disabled={true}*/}
          {/*/>*/}
          <Input
            label="생년월일"
            value={birthInput.value}
            placeholder="자동입력"
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>
        <View style={common.mb16}>
          <Input
            label="주소"
            onChangeText={addressInput.onChange}
            value={addressInput.value}
            placeholder="자동입력"
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        <View style={common.mb20}>
          <Input
            label={'연락처'}
            onChangeText={phoneNumberInput.onChange}
            value={phoneNumberInput.value}
            placeholder={'자동입력'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>
        <View style={[common.mb16]}>
          <TabButton
            genderData={GENDER_DATA}
            onSelect={genderInput.onChange}
            value={genderInput.value}
          />
        </View>
        {careers.map((_: any, index: number) => (
          <View key={index} style={[common.mv20]}>
            {index !== 0 && (
              <Pressable onPress={removeCareerForm} style={styles.removeButton}>
                <Image source={iconPath.CANCEL} style={[common.size24]} />
              </Pressable>
            )}
            <View>
              <CareerComponent
                onSelectPosition={(value: string) => handleCareers(value, 'field', index)}
                onSelectWorkType={(value: string) => handleCareers(value, 'workType', index)}
                onSelectStartDate={(value: string) => handleCareers(value, 'startDate', index)}
                onSelectEndDate={(value: string) => handleCareers(value, 'endDate', index)}
              />
            </View>
          </View>
        ))}
        <View style={common.mb16}>
          <Pressable onPress={addCareerForm} style={{ alignSelf: 'center' }}>
            <Image source={iconPath.ADD_BUTTON} style={common.size40} />
          </Pressable>
        </View>
        {educations.map((_: any, index: number) => (
          <View key={index} style={common.mv20}>
            {index !== 0 && (
              <Pressable onPress={removeEducationForm} style={styles.removeButton}>
                <Image source={iconPath.CANCEL} style={[common.size24]} />
              </Pressable>
            )}
            <View>
              <EducationComponent
                onSelectSchool={(value: string) => handleEducations(value, 'school', index)}
                onSelectMajor={(value: string) => handleEducations(value, 'major', index)}
                onSelectStartDate={(value: string) => handleEducations(value, 'startDate', index)}
                onSelectEndDate={(value: string) => handleEducations(value, 'endDate', index)}
                onSelectStatus={(value: string) => handleEducations(value, 'status', index)}
              />
            </View>
          </View>
        ))}
        <View style={common.mb16}>
          <Pressable onPress={addEducationForm} style={{ alignSelf: 'center' }}>
            <Image source={iconPath.ADD_BUTTON} style={common.size40} />
          </Pressable>
        </View>
        <View style={common.mb16}>
          <SelectBox
            label="자격증"
            data={licences?.map((licence) => licence.issuer + '_' + licence.field)}
            onSelect={(_: any, index: number) => selectLicence(index)}
            defaultButtonText="자격증을 선택하세요."
            selectKey="index"
          />
        </View>
        <View style={common.mb16}>
          <Input
            label="소개글"
            onChangeText={introduceInput.onChange}
            value={introduceInput.value}
            placeholder="소개글을 작성해 주세요."
            keyboardType={KeyboardTypes.DEFAULT}
            editable
            multiline
          />
        </View>
        <View style={common.mt20}>
          <CTAButton
            label="작성 완료"
            loading={createResumeMutation.isLoading}
            disabled={!formValid}
            onPress={onCreateResume}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  removeButton: { marginBottom: 8, alignItems: 'flex-end' },
});

export default ResumeFormScreen;
