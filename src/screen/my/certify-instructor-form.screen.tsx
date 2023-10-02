import CTAButton from '@/components/Common/CTAButton';
import useInput from '@/hooks/use-input';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { useAppSelector } from '@/store';
import { createMemberLicence } from '@api/member';
import BirthdayPicker from '@components/BirthdayPicker';
import Input, { KeyboardTypes } from '@components/Input';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Asset, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { LoggedInParamList } from '../../../AppInner';

const FIELD = ['필라테스', '요가'];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.CERTITY_INSTRUCTOR_FORM>;

export const CertifyInstructorFormScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const memberInfo = useAppSelector((state) => state.user);

  const nameInput = useInput(memberInfo.name);
  const birthInput = useInput(memberInfo.birth);
  const fieldInput = useInput('');
  const issuerInput = useInput('');
  const issuerDateInput = useInput('');
  const licenceNumberInput = useInput('');

  const [licenceImageObj, setLicenceImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({ name: undefined, type: undefined, uri: undefined });

  const [licenceFileName, setLicenceFileName] = useState<string | undefined>('');

  const isNameInputValid = nameInput.value.length > 0;
  const isBirthInputValid = birthInput.value.length > 0;
  const isFieldInputValid = fieldInput.value.length > 0;
  const isIssuerInputValid = issuerInput.value.length > 0;
  const isIssuerDateInputValid = issuerDateInput.value.length > 0;
  const isLicenceNumberInputValid = licenceNumberInput.value.length > 0;
  const isLicenceImageObjValid =
    licenceImageObj.name !== undefined &&
    licenceImageObj.type !== undefined &&
    licenceImageObj.uri !== undefined;

  const canGoNext =
    isNameInputValid &&
    isBirthInputValid &&
    isFieldInputValid &&
    isIssuerInputValid &&
    isIssuerDateInputValid &&
    isLicenceNumberInputValid &&
    isLicenceImageObjValid;

  const onRegisterLicence = async () => {
    const formData = new FormData();

    formData.append('field', fieldInput.value);
    formData.append('licenceNumber', licenceNumberInput.value);
    formData.append('issuer', issuerInput.value);
    formData.append('issuerDate', issuerDateInput.value);
    formData.append('file', licenceImageObj);

    setIsLoading(true);

    try {
      await createMemberLicence(formData);
      toast.success({ message: '강사 인증이 신청되었어요!' });
      navigation.goBack();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({ message: error.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
    };

    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        console.log('ImagePicker Message: ', response.errorMessage);
      } else {
        const assets: Asset[] | undefined = response.assets;
        // let source;
        if (assets) {
          // source = {
          //   uri: 'data:image/jpeg;base64,' + assets[0].base64,
          // };
          setLicenceImageObj({
            name: assets[0].fileName,
            type: assets[0].type,
            uri: assets[0].uri,
          });
          setLicenceFileName(assets[0].fileName);
        }
      }
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label={'이름'}
            onChangeText={nameInput.onChange}
            value={nameInput.value}
            placeholder={'김링크'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <BirthdayPicker
            label={'생년월일'}
            onSelect={birthInput.onChange}
            value={birthInput.value}
            placeholder={'생년월일을 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <SelectBox
            label={'자격명'}
            data={FIELD}
            onSelect={fieldInput.onChange}
            defaultButtonText={'자격 인증 분야를 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'자격증 번호'}
            onChangeText={licenceNumberInput.onChange}
            value={licenceNumberInput.value}
            placeholder={'자격증 번호를 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'자격증 발급기관'}
            onChangeText={issuerInput.onChange}
            value={issuerInput.value}
            placeholder={'자격증 발급기관을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <BirthdayPicker
            label={'자격증 발급일자'}
            onSelect={issuerDateInput.onChange}
            value={issuerDateInput.value}
            placeholder={'자격증 발급일자를 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <Pressable onPress={uploadImage} hitSlop={10}>
            <Input
              label={'자격증 이미지'}
              onChangeText={(text: string) => setLicenceFileName(text.trim())}
              value={licenceFileName}
              placeholder={'자격증 이미지를 등록하세요.'}
              keyboardType={KeyboardTypes.DEFAULT}
              editable={false}
            />

            <View style={styles.cameraIcon}>
              <Image source={iconPath.PHOTO} style={common.size24} />
            </View>
          </Pressable>
        </View>
        <View style={common.mt40}>
          <CTAButton
            label="인증 신청하기"
            loading={isLoading}
            disabled={!canGoNext}
            onPress={onRegisterLicence}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  cameraIcon: {
    backgroundColor: WHITE,
    height: 30,
    position: 'absolute',
    right: 16,
    top: 16,
    width: 30,
  },
  container: {
    backgroundColor: WHITE,
    flex: 1,
    padding: 16,
  },
});
