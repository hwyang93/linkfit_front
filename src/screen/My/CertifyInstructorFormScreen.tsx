import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useCallback, useState} from 'react';
import BirthdayPicker from '@components/BirthdayPicker';
import SelectBox from '@components/SelectBox';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import {Asset, launchImageLibrary, MediaType} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import {createMemberLicence} from '@api/member';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

const FIELD = ['필라테스', '요가'];
function CertifyInstructorFormScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const memberInfo = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState(memberInfo.name);
  const [birthday, setBirthday] = useState(memberInfo.birth);
  const [field, setField] = useState('');
  const [issuer, setIssuer] = useState('');
  const [licenceNumber, setLicenceNumber] = useState('');
  const [licenceImageObj, setLicenceImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({name: undefined, type: undefined, uri: undefined}); // file 주소
  const [licenceFileName, setLicenceFileName] = useState(''); // file 이름

  const onRegisterLicence = useCallback(() => {
    const formData = new FormData();

    formData.append('field', field);
    formData.append('licenceNumber', licenceNumber);
    formData.append('issuer', issuer);
    formData.append('file', licenceImageObj);

    createMemberLicence(formData)
      .then(() => {
        Alert.alert('강사 인증이 신청되었어요!.');
        navigation.goBack();
      })
      .catch((e: {message: any}) => {
        console.log(e);
        Alert.alert(e.message);
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
          {Platform.OS === 'ios' ? (
            <BirthdayPicker />
          ) : (
            <Input
              label={'생년월일'}
              onChangeText={(text: any) => setBirthday(text)}
              value={birthday}
              placeholder={'YYYY.MM.DD'}
              keyboardType={KeyboardTypes.NUMBER}
            />
          )}
        </View>

        <View style={common.mb16}>
          <SelectBox
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
          <Input
            label={'자격증 이미지'}
            value={licenceFileName}
            placeholder={'자격증 이미지를 등록하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
          <Pressable style={styles.image} onPress={uploadImage}>
            <Image source={iconPath.PHOTO} style={[common.size24]} />
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  image: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});
export default CertifyInstructorFormScreen;
