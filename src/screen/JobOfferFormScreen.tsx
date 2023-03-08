import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import SelectBox from '@components/SelectBox';
import LinearGradient from 'react-native-linear-gradient';
import MultipleImagePicker, {
  MediaType,
} from '@baronha/react-native-multiple-image-picker';

function JobOfferFormScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [position, setPosition] = useState('');
  const [education, setEducation] = useState('');
  const [career, setCareer] = useState('');
  const [time, setTime] = useState('');
  const [payType, setPayType] = useState('');
  const [pay, setPay] = useState('');
  const [content, setContent] = useState('');

  const POSITION = ['실장', '필라테스', '요가'];
  const EDUCATION = ['학력 무관', '고졸 이상', '대졸 이상'];
  const CAREER = ['경력 무관', '신입', '1년 이상', '3년 이상', '5년 이상'];
  const TIME = ['평일 오전', '평일 오후', '주말 오전', '주말 오후'];
  const PAY_TYPE = ['시급', '주급', '월급', '연봉'];

  const canGoNext = false;

  const [images, setImages] = useState<any>([]);

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        selectedAssets: images,
        isExportThumbnail: true,
        maxSelectedAssets: 5,
        maxVideo: 0,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e: any) {
      console.log(e.code, e.message);
    }
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Pressable style={[styles.photoBox, common.mb16]} onPress={openPicker}>
          <Image source={iconPath.PHOTO} style={[common.size24]} />
          <Text style={common.text_s}>0/5</Text>
        </Pressable>

        {/* 글 제목 */}
        <View style={common.mb16}>
          <Input
            label={'글 제목'}
            onChangeText={(text: string) => setOfferTitle(text)}
            value={offerTitle}
            placeholder={'필라테스 센터 실장님 구합니다.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
          />
        </View>
        {/* 채용 포지션 */}
        <View style={common.mb16}>
          <SelectBox
            label={'채용 포지션'}
            data={POSITION}
            onSelect={(value: any) => setPosition(value)}
            defaultButtonText={'채용 포지션'}
          />
        </View>
        {/* 학력 */}
        <View style={common.mb16}>
          <SelectBox
            label={'학력'}
            data={EDUCATION}
            onSelect={(value: any) => setEducation(value)}
            defaultButtonText={'학력을 선택하세요.'}
          />
        </View>
        {/* 경력 */}
        <View style={common.mb16}>
          <SelectBox
            label={'경력'}
            data={CAREER}
            onSelect={(value: any) => setCareer(value)}
            defaultButtonText={'경력을 선택하세요.'}
          />
        </View>
        {/* 시간 */}
        <View style={common.mb16}>
          <SelectBox
            label={'시간'}
            data={TIME}
            onSelect={(value: any) => setTime(value)}
            defaultButtonText={'시간을 선택하세요.'}
          />
        </View>
        {/* 급여 형태 */}
        <View style={common.mb16}>
          <SelectBox
            label={'급여 형태'}
            data={PAY_TYPE}
            onSelect={(value: any) => setPayType(value)}
            defaultButtonText={'급여 형태를 선택하세요.'}
          />
        </View>
        {/* 급여 */}
        <View style={common.mb16}>
          <Input
            label={'급여'}
            onChangeText={(text: string) => setPay(text)}
            value={pay}
            placeholder={'급여를 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
          />
        </View>
        {/* 상세 정보 */}
        <View style={common.mb16}>
          <Input
            label={'상세 정보'}
            onChangeText={(text: string) => setContent(text)}
            value={content}
            placeholder={'상세 정보를 작성해주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/* 채용 공고 등록 버튼 */}
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
                <Text style={common.buttonText}>채용 공고 등록</Text>
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
  photoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
  },
});
export default JobOfferFormScreen;
