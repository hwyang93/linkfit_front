import {Image, StyleSheet, Text, View} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import SelectBox from '@components/SelectBox';

function JobOfferFormScreen() {
  const [offerTitle, setOfferTitle] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [education, setEducation] = useState('');
  const [career, setCareer] = useState('');
  const [time, setTime] = useState('');
  const [payType, setPayType] = useState('');
  const [pay, setPay] = useState('');

  const POSITION = ['실장', '필라테스', '요가'];
  const EDUCATION = ['학력 무관', '고졸 이상', '대졸 이상'];
  const CAREER = ['경력 무관', '신입', '1년 이상', '3년 이상', '5년 이상'];
  const TIME = ['평일 오전', '평일 오후', '주말 오전', '주말 오후'];
  const PAY_TYPE = ['시급', '주급', '월급', '연봉'];

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={[styles.photoBox, common.mb16]}>
          <Image source={iconPath.PHOTO} style={[common.size24]} />
          <Text style={common.text_s}>0/5</Text>
        </View>

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
            data={POSITION}
            onSelect={(value: any) => setJobPosition(value)}
            defaultButtonText={'채용 포지션'}
          />
        </View>
        {/* 학력 */}
        <View style={common.mb16}>
          <SelectBox
            data={EDUCATION}
            onSelect={(value: any) => setEducation(value)}
            defaultButtonText={'학력을 선택하세요.'}
          />
        </View>
        {/* 경력 */}
        <View style={common.mb16}>
          <SelectBox
            data={CAREER}
            onSelect={(value: any) => setCareer(value)}
            defaultButtonText={'경력을 선택하세요.'}
          />
        </View>
        {/* 시간 */}
        <View style={common.mb16}>
          <SelectBox
            data={TIME}
            onSelect={(value: any) => setTime(value)}
            defaultButtonText={'시간을 선택하세요.'}
          />
        </View>
        {/* 급여 형태 */}
        <View style={common.mb16}>
          <SelectBox
            data={PAY_TYPE}
            onSelect={(value: any) => setPayType(value)}
            defaultButtonText={'급여 형태를 선택하세요.'}
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
