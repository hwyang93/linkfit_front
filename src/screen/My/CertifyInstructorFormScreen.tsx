import {
  ActivityIndicator,
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
import {useState} from 'react';
import BirthdayPicker from '@components/BirthdayPicker';
import SelectBox from '@components/SelectBox';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';

function CertifyInstructorFormScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [field, setField] = useState('');
  const [issuer, setIssuer] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseImage, setLicenseImage] = useState(''); // file 주소
  const [licenseFileName, setLicenseFileName] = useState(''); // file 이름

  const FIELD = ['필라테스', '요가'];

  const uploadImage = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setLicenseImage(source);
        setLicenseFileName(response.assets[0].fileName);
      }
    });
  };

  const canGoNext = true;
  return (
    <ScrollView>
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
            onChangeText={(text: string) => setLicenseNumber(text.trim())}
            value={licenseNumber}
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
            onChangeText={(text: string) => setLicenseImage(text.trim())}
            value={licenseFileName}
            placeholder={'자격증 이미지를 등록하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
          />
          <Pressable style={styles.image} onPress={uploadImage}>
            <Image source={iconPath.PHOTO} style={[common.size24]} />
          </Pressable>
        </View>

        <View style={common.mt40}>
          <Pressable onPress={() => {}}>
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
