import {useAppSelector} from '@/store';
import {iconPath} from '@/utils/iconPath';
import {createMemberLicence} from '@api/member';
import BirthdayPicker from '@components/BirthdayPicker';
import Input, {KeyboardTypes} from '@components/Input';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Asset, MediaType, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {LoggedInParamList} from '../../../AppInner';

const FIELD = ['필라테스', '요가'];

type Props = NativeStackScreenProps<LoggedInParamList, 'CertifyInstructorForm'>;

const CertifyInstructorFormScreen = ({navigation}: Props) => {
  const memberInfo = useAppSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(memberInfo.name);
  const [birth, setBirth] = useState(memberInfo.birth);
  const [field, setField] = useState('');
  const [issuer, setIssuer] = useState('');
  const [licenceNumber, setLicenceNumber] = useState('');
  const [licenceImageObj, setLicenceImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({name: undefined, type: undefined, uri: undefined}); // file 주소
  const [licenceFileName, setLicenceFileName] = useState<string | undefined>(
    '',
  ); // file 이름

  const onRegisterLicence = useCallback(() => {
    const formData = new FormData();

    formData.append('field', field);
    formData.append('licenceNumber', licenceNumber);
    formData.append('issuer', issuer);
    formData.append('file', licenceImageObj);

    createMemberLicence(formData)
      .then(() => {
        toast.success('강사 인증이 신청되었어요!');
        navigation.goBack();
      })
      .catch((e: {message: any}) => {
        console.log(e);
        toast.error({message: e.message});
      });
  }, [field, issuer, licenceNumber, licenceImageObj, navigation]);

  const uploadImage = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
    };
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        console.log('ImagePicker Message: ', response.errorMessage);
      } else {
        let assets: Asset[] | undefined = response.assets;
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

  const canGoNext = true;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label={'이름'}
            onChangeText={(text: string) => setName(text.trim())}
            value={name}
            placeholder={'김링크'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <BirthdayPicker
            label={'생년월일'}
            onSelect={(value: any) => setBirth(value)}
            value={birth}
            placeholder={'생년월일을 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <SelectBox
            label={'자격명'}
            data={FIELD}
            onSelect={(value: any) => setField(value)}
            defaultButtonText={'자격 인증 분야를 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'자격증 번호'}
            onChangeText={(text: string) => setLicenceNumber(text.trim())}
            value={licenceNumber}
            placeholder={'자격증 번호를 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'자격증 발급기관'}
            onChangeText={(text: string) => setIssuer(text.trim())}
            value={issuer}
            placeholder={'자격증 발급기관을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
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
              <Image source={iconPath.PHOTO} style={[common.size24]} />
            </View>
          </Pressable>
        </View>

        <View style={common.mt40}>
          <Pressable onPress={onRegisterLicence}>
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
                <Text style={common.buttonText}>인증 신청하기</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  cameraIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 16,
    top: 16,
    backgroundColor: WHITE,
  },
});
export default CertifyInstructorFormScreen;
