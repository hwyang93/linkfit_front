import {
  ActivityIndicator,
  Alert,
  Dimensions,
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
import {Key, useCallback, useState} from 'react';
import SelectBox from '@components/SelectBox';
import LinearGradient from 'react-native-linear-gradient';
import MultipleImagePicker, {
  MediaType,
} from '@baronha/react-native-multiple-image-picker';
import TimeComponent from '@components/Offer/TimeComponent';
import toast from '@hooks/toast';
import {createRecruit} from '@api/recruit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';

const POSITION = ['실장', '필라테스', '요가'];
const EDUCATION = ['학력 무관', '고졸 이상', '대졸 이상'];
const CAREER = ['경력 무관', '신입', '1년 이상', '3년 이상', '5년 이상'];
const TIME = ['평일 오전', '평일 오후', '주말 오전', '주말 오후'];
const TIME2 = ['오전', '오후', '전일', '시간 협의'];
const PAY_TYPE = ['시급', '주급', '월급', '연봉'];

// 채용포지션이 필라테스 요가의 경우
const RECRUIT_TYPE = ['전임', '파트', '대강'];

const windowWidth = Dimensions.get('window').width;
const columns7 = (windowWidth - 32) / 7;
type Props = NativeStackScreenProps<LoggedInParamList>;
function JobOfferFormScreen({navigation}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [position, setPosition] = useState('');
  const [education, setEducation] = useState('');
  const [career, setCareer] = useState('');
  const [time, setTime] = useState('');
  const [payType, setPayType] = useState('');
  const [pay, setPay] = useState('');
  const [content, setContent] = useState('');
  const [recruitType, setRecruitType] = useState(''); // 채용 형태
  const [day, setDay] = useState(''); // 요일
  const [date, setDate] = useState('');
  const [dateForm, setDateForm] = useState<any[]>([{}]);

  const [DAY, setDAY] = useState([
    {value: '월', selected: false},
    {value: '화', selected: false},
    {value: '수', selected: false},
    {value: '목', selected: false},
    {value: '금', selected: false},
    {value: '토', selected: false},
    {value: '일', selected: false},
  ]);

  const canGoNext = true;

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

  const addTimetable = () => {
    setDateForm([...dateForm, {}]);
  };

  const handleDaySelection = (index: any) => {
    const updatedDay = [...DAY];
    updatedDay[index].selected = !updatedDay[index].selected;
    setDAY(updatedDay);
    let dayList: string = '';
    updatedDay.map(item => {
      if (item.selected) {
        return (dayList += item.value + ', ');
      }
    });
    const newDate = dateForm;
    newDate[0].day = dayList.substring(0, dayList.length - 2);
    setDateForm(newDate);
    setDay(dayList.substring(0, dayList.length - 2));
  };

  const handleTimeSelection = (time: string) => {
    const newDate = dateForm;
    newDate[0].time = time;
    setDateForm(newDate);
  };
  const handleAddDates = (value: string, type: string, index: number) => {
    const newDates = dateForm;
    newDates[index][type] = value;
    setDateForm(newDates);
  };

  const onCreateRecruit = useCallback(() => {
    // toast.error({message: e.message});
    const data = {
      title: offerTitle,
      companyName: 'string',
      position: position,
      address: 'string',
      addressDetail: 'string',
      district: 'string',
      phone: 'string',
      recruitType: recruitType,
      career: career,
      education: education,
      payType: payType,
      pay: pay,
      classType: 'string',
      content: content,
      lon: 0,
      lat: 0,
      dates: dateForm,
    };
    console.log(data);
    createRecruit(data)
      .then(() => {
        Alert.alert('채용 공고 등록이 완료되었어요!');
        navigation.pop();
      })
      .catch((e: {message: any}) => {
        toast.error({message: e.message});
      });
  }, [
    career,
    content,
    dateForm,
    education,
    offerTitle,
    pay,
    payType,
    position,
    recruitType,
  ]);

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
            placeholder={'공고 제목을 입력하세요.'}
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

        {/* 요가, 필라테스의 경우 표시 */}
        {position === '실장' || position === '' ? null : (
          <View style={common.mb16}>
            <SelectBox
              label={'채용 형태'}
              data={RECRUIT_TYPE}
              onSelect={(value: any) => setRecruitType(value)}
              defaultButtonText={'채용 형태'}
            />
          </View>
        )}

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

        {/* 날짜 선택 조건 */}
        {/* 포지션이 실장일 경우 */}
        {position === '' || position === '실장' ? (
          <View style={common.mb16}>
            <SelectBox
              label={'시간'}
              data={TIME}
              onSelect={(value: any) => setDateForm([{day: '', time: value}])}
              defaultButtonText={'시간을 선택하세요.'}
            />
          </View>
        ) : (
          <>
            {recruitType !== '대강' ? (
              <>
                <View style={common.mb16}>
                  <Input
                    label={'요일'}
                    onChangeText={(item: any) => setDay(item)}
                    value={day}
                    icon={'day'}
                    placeholder={'요일을 선택하세요.'}
                    keyboardType={KeyboardTypes.DEFAULT}
                    textAlign={'right'}
                    editable={false}
                  />
                </View>
                <View style={[common.mb16, common.row]}>
                  {DAY.map((item, index) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => handleDaySelection(index)}
                        style={[
                          styles.dateItem,
                          item.selected && {backgroundColor: '#d7e0fd'},
                        ]}>
                        <Text style={[common.text_m, {color: '#292929'}]}>
                          {item.value}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                <View style={common.mb16}>
                  <SelectBox
                    label={'시간'}
                    data={TIME2}
                    onSelect={(value: any) => handleTimeSelection(value)}
                    defaultButtonText={'선택한 요일의 시간을 선택하세요.'}
                  />
                </View>
              </>
            ) : (
              <>
                {dateForm.map((item: any, index: number) => {
                  return (
                    <View key={'dateFrom' + index}>
                      <TimeComponent
                        onSelectDay={(value: string) =>
                          handleAddDates(value, 'day', index)
                        }
                        onSelectTime={(value: string) =>
                          handleAddDates(value, 'time', index)
                        }
                      />
                    </View>
                  );
                })}

                {/* 추가 버튼 */}
                {dateForm.length < 3 ? (
                  <View style={common.mb16}>
                    <Pressable
                      style={{alignSelf: 'center'}}
                      onPress={addTimetable}>
                      <Image
                        source={iconPath.ADD_BUTTON}
                        style={common.size40}
                      />
                    </Pressable>
                  </View>
                ) : null}
              </>
            )}
          </>
        )}

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
          <Pressable onPress={onCreateRecruit}>
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
  dateItem: {
    width: columns7,
    height: columns7,
    // backgroundColor: '#d7e0fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
});
export default JobOfferFormScreen;
