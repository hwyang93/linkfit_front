import CTAButton from '@/components/Common/CTAButton';
import useInput from '@/hooks/useInput';
import {useSelect} from '@/hooks/useSelect';
import {useAppSelector} from '@/store';
import {Coordinate, Member} from '@/types/common';
import {SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {createRecruit} from '@api/recruit';
import SearchAddressInput from '@components/Common/SearchAddressInput';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import TimeComponent from '@components/Offer/TimeComponent';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GRAY} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

const POSITION = ['실장', '필라테스', '요가'];
const EDUCATION = ['학력 무관', '고졸 이상', '대졸 이상'];
const CAREER = ['경력 무관', '신입', '1년 이상', '3년 이상', '5년 이상'];
const TIME = ['평일 오전', '평일 오후', '주말 오전', '주말 오후'];
const TIME2 = ['오전', '오후', '전일', '시간 협의'];
const PAY_TYPE = ['시급', '주급', '월급', '연봉'];

// 채용포지션이 필라테스 요가의 경우
const RECRUIT_TYPE = ['전임', '파트', '대강'];

const columns7 = (SCREEN_WIDTH - 80) / 7;

type Props = NativeStackScreenProps<LoggedInParamList, 'JobOfferForm'>;

const JobOfferFormScreen = ({navigation}: Props) => {
  const memberInfo = useAppSelector(state => state.user);

  const offerTitleInput = useInput();
  const payInput = useInput();
  const companyNameInput = useInput();
  const addressDetailInput = useInput();
  const contentInput = useInput();

  const positionSelect = useSelect();
  const educationSelect = useSelect();
  const careerSelect = useSelect();
  const payTypeSelect = useSelect();
  const recruitTypeSelect = useSelect();

  const [day, setDay] = useState('');
  const [dateForm, setDateForm] = useState<any[]>([{}]);
  const [address, setAddress] = useState('');
  const [lon, setLon] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [DAY, setDAY] = useState([
    {value: '월', selected: false},
    {value: '화', selected: false},
    {value: '수', selected: false},
    {value: '목', selected: false},
    {value: '금', selected: false},
    {value: '토', selected: false},
    {value: '일', selected: false},
  ]);

  const isFormValid =
    !!offerTitleInput.value &&
    !!positionSelect.value &&
    !!educationSelect.value &&
    !!careerSelect.value &&
    !!payTypeSelect.value &&
    !!payInput.value &&
    !!contentInput.value &&
    !!recruitTypeSelect.value &&
    !!day &&
    !!dateForm &&
    !!companyNameInput.value &&
    !!address &&
    !!addressDetailInput.value;

  // const openPicker = async () => {
  //   try {
  //     const response = await MultipleImagePicker.openPicker({
  //       mediaType: MediaType.IMAGE,
  //       selectedAssets: images,
  //       maxSelectedAssets: 5,
  //       usedCameraButton: false,
  //     });
  //     setImages(response);
  //   } catch (e: any) {
  //     console.log(e.code, e.message);
  //   }
  // };

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

  const setCompanyAddressInfo = (data: {
    address: string;
    coordinate: Coordinate | null;
  }) => {
    setAddress(data.address);

    if (data.coordinate) {
      setLat(data.coordinate.y);
      setLon(data.coordinate.x);
    }
  };

  const onCreateRecruit = () => {
    if (!lon || !lat) {
      return;
    }

    const data = {
      title: offerTitleInput.value,
      companyName: companyNameInput.value,
      position: positionSelect.value,
      address: address,
      addressDetail: addressDetailInput.value,
      district: 'string',
      phone: memberInfo.phone,
      recruitType: recruitTypeSelect.value,
      career: careerSelect.value,
      education: educationSelect.value,
      payType: payTypeSelect.value,
      pay: payInput.value,
      classType: 'string',
      content: contentInput.value,
      lon: lon,
      lat: lat,
      dates: dateForm,
    };

    createRecruit(data)
      .then(() => {
        toast.success({message: '채용 공고 등록이 완료되었어요!'});
        navigation.pop();
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  };

  return (
    <DismissKeyboardView>
      <View style={{margin: 16, marginBottom: 32}}>
        {/*이미지 올리기 임시 주석처리*/}
        {/*<Pressable style={[styles.photoBox, common.mb16]} onPress={openPicker}>*/}
        {/*  <Image source={iconPath.PHOTO} style={[common.size24]} />*/}
        {/*  <Text style={common.text_s}>0/5</Text>*/}
        {/*</Pressable>*/}
        <View style={common.mb16}>
          <Input
            label="글 제목"
            onChangeText={offerTitleInput.onChange}
            value={offerTitleInput.value}
            placeholder="공고 제목을 입력하세요."
            keyboardType={KeyboardTypes.DEFAULT}
            editable
          />
        </View>
        <View style={common.mb16}>
          <SelectBox
            label="채용 포지션"
            data={POSITION}
            onSelect={positionSelect.onChange}
            defaultButtonText="채용 포지션"
          />
        </View>
        {/* 요가, 필라테스의 경우 표시 */}
        {positionSelect.value === '실장' ||
        positionSelect.value === '' ? null : (
          <View style={common.mb16}>
            <SelectBox
              label="채용 형태"
              data={RECRUIT_TYPE}
              onSelect={recruitTypeSelect.onChange}
              defaultButtonText="채용 형태"
            />
          </View>
        )}
        <View style={common.mb16}>
          <SelectBox
            label="학력"
            data={EDUCATION}
            onSelect={educationSelect.onChange}
            defaultButtonText="학력을 선택하세요."
          />
        </View>
        <View style={common.mb16}>
          <SelectBox
            label="경력"
            data={CAREER}
            onSelect={careerSelect.onChange}
            defaultButtonText="경력을 선택하세요."
          />
        </View>
        {/* 날짜 선택 조건 */}
        {/* 포지션이 실장일 경우 */}
        {positionSelect.value === '' || positionSelect.value === '실장' ? (
          <View style={common.mb16}>
            <SelectBox
              label="시간"
              data={TIME}
              onSelect={(value: any) => setDateForm([{day: '', time: value}])}
              defaultButtonText="시간을 선택하세요."
            />
          </View>
        ) : (
          <>
            {recruitTypeSelect.value !== '대강' ? (
              <>
                <View style={common.mb16}>
                  <Input
                    label="요일"
                    onChangeText={(item: any) => setDay(item)}
                    value={day}
                    icon="day"
                    placeholder="요일을 선택하세요."
                    keyboardType={KeyboardTypes.DEFAULT}
                    textAlign="right"
                    editable={false}
                  />
                </View>
                <View
                  style={[
                    common.mb16,
                    common.row,
                    {justifyContent: 'space-between'},
                  ]}>
                  {DAY.map((item, index) => (
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
                  ))}
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
                {dateForm.map((_, index: number) => (
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
                ))}

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
        <View style={common.mb16}>
          <SelectBox
            label="급여 형태"
            data={PAY_TYPE}
            onSelect={payTypeSelect.onChange}
            defaultButtonText="급여 형태를 선택하세요."
          />
        </View>
        <View style={common.mb16}>
          <Input
            label="급여"
            onChangeText={payInput.onChange}
            value={payInput.value}
            placeholder="급여를 입력하세요."
            keyboardType={KeyboardTypes.DEFAULT}
            editable
          />
        </View>

        {memberInfo.type !== Member.Company && (
          <View>
            <View style={common.mb16}>
              <Input
                label="업체명"
                onChangeText={companyNameInput.onChange}
                value={companyNameInput.value}
                placeholder="업체명을 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                editable
              />
            </View>
            <View style={common.mb8}>
              <SearchAddressInput
                label="업체 주소"
                onChangeAddress={setCompanyAddressInfo}
                value={address}
                keyboardType={KeyboardTypes.DEFAULT}
              />
            </View>
            <View style={common.mb16}>
              <Input
                onChangeText={addressDetailInput.onChange}
                value={addressDetailInput.value}
                placeholder="상세 주소를 입력하세요."
                keyboardType={KeyboardTypes.DEFAULT}
                editable
              />
            </View>
          </View>
        )}
        <View style={common.mb16}>
          <Input
            label="상세 정보"
            onChangeText={contentInput.onChange}
            value={contentInput.value}
            placeholder="상세 정보를 작성해주세요."
            keyboardType={KeyboardTypes.DEFAULT}
            editable
            multiline
          />
        </View>
        <CTAButton
          label="채용 공고 등록"
          onPress={onCreateRecruit}
          disabled={!isFormValid}
        />
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
});

export default JobOfferFormScreen;
