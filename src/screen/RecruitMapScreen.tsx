import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {iconPath} from '@util/iconPath';
import LocationButton from '@components/LocationButton';
import FloatingLinkButton from '@components/FloatingLinkButton';
import {SetStateAction, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingWriteButton from '@components/FloatingWriteButton';
import Modal from '@components/ModalSheet';

import {recruitStore, recruitAction} from '@/zustand/recruitStore';
import TopFilter2 from '@components/TopFilter2';
import common from '@styles/common';
import {BLUE} from '@styles/colors';
import LinearGradient from 'react-native-linear-gradient';

async function requestPermission() {
  try {
    // IOS 위치 정보 수집 권한 요청
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function RecruitMapScreen() {
  // 컴포넌트에서 Zustand 불러오기
  const recruitState = recruitStore(state => state);
  const filters = recruitState.filters;

  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  // const [myLocation, setMyLocation] = useState({});
  // const [myLocation, setMyLocation] = useState<
  //   {latitude: number; longitude: number} | string
  // >('');
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos: any) => {
            // console.log('지금위치', pos);
            setMyLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
  }, []);

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  // const P1 = {latitude: 37.565051, longitude: 126.978567};

  const FILTER = [
    {
      value: '포지션',
      job: () => {
        setModalTitle('포지션');
        setModalData(MODAL);
        openModal();
        // zustand 필터값 탭번호 1번으로 수정
        filters.currentTab = 1;
        recruitAction.filtersSet(filters);
      },
    },
    {
      value: '채용형태',
      job: () => {
        setModalTitle('채용형태');
        setModalData(MODAL2);
        openModal();
        filters.currentTab = 2;
        recruitAction.filtersSet(filters);
      },
    },
    {
      value: '수업시간',
      job: () => {
        setModalTitle('수업시간');
        setModalData(MODAL3);
        openModal();
        filters.currentTab = 3;
        recruitAction.filtersSet(filters);
      },
    },
  ];

  const MODAL = [
    {
      icon: iconPath.LINK,
      iconOn: iconPath.LINK_ON,
      value: '전체',
      selected: false,
      job: () => {
        recruitState.filters.currentPosition = '전체';
        recruitAction.filtersSet(recruitState.filters);
        setSelected(!selected);
        console.log(selected);
      },
    },
    {
      icon: iconPath.PILATES,
      iconOn: iconPath.PILATES_ON,
      value: '필라테스',
      selected: false,
      job: () => {
        recruitState.filters.currentPosition = '필라테스';
        recruitAction.filtersSet(recruitState.filters);
        setSelected(!selected);
      },
    },
    {
      icon: iconPath.YOGA,
      iconOn: iconPath.YOGA_ON,
      value: '요가',
      selected: false,
      job: () => {
        recruitState.filters.currentPosition = '요가';
        recruitAction.filtersSet(recruitState.filters);
        setSelected(!selected);
      },
    },
  ];
  const MODAL2 = [
    {
      value: '전임',
      selected: false,
      job: () => {
        recruitState.filters.currentType = '전임';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
    {
      value: '파트타임',
      selected: false,
      job: () => {
        recruitState.filters.currentType = '파트타임';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
    {
      value: '대강',
      selected: false,
      job: () => {
        recruitState.filters.currentType = '대강';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
    {
      value: '실장',
      selected: false,
      job: () => {
        recruitState.filters.currentType = '실장';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
  ];
  const MODAL3 = [
    {
      value: '오전',
      selected: false,
      job: () => {
        recruitState.filters.currentDate = '오전';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
    {
      value: '오후',
      selected: false,
      job: () => {
        recruitState.filters.currentDate = '오후';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
    {
      value: '전일',
      selected: false,
      job: () => {
        recruitState.filters.currentDate = '전일';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
    {
      value: '협의',
      selected: false,
      job: () => {
        recruitState.filters.currentDate = '협의';
        recruitAction.filtersSet(recruitState.filters);
      },
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };
  const onFilter = () => {
    recruitAction.onFilter();
    setModalVisible(false);
  };
  useEffect(() => {
    // zustand 재방문시 filter 초기화
    recruitAction.filtersSet({
      currentTab: 1,
      position: '포지션',
      currentPosition: '포지션',
      type: '채용형태',
      currentType: '채용형태',
      date: '수업시간',
      currentDate: '수업시간',
    });
  }, []);
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        {/* 필터 영역 */}
        <TopFilter2 data={FILTER} />
        {/* 필터 영역 */}
      </View>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={false}
        zoomControl={false}
        center={{...P0, zoom: 16}}
        onTouch={(e: {nativeEvent: any}) =>
          console.warn('onTouch', JSON.stringify(e.nativeEvent))
        }
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        {/*<Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />*/}
        {myLocation?.latitude && (
          <Marker
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}
            pinColor="red"
          />
        )}
        {/*<Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />*/}
        {/*<Marker*/}
        {/*  coordinate={P1}*/}
        {/*  pinColor="blue"*/}
        {/*  onClick={() => console.warn('onClick! p1')}*/}
        {/*/>*/}
      </NaverMapView>
      {/* Floating Button */}
      <FloatingWriteButton bottom={144} icon={iconPath.PENCIL_W} />
      {/* 현재 위치로 이동 버튼 */}
      <LocationButton bottom={88} />
      {/* 페이지 이동 버튼 */}
      <FloatingLinkButton
        link={'RecruitList'}
        title={'목록보기'}
        icon={iconPath.LIST}
      />
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalTitle}
        modalData={modalData}
        type={'check'}
        onFilter={onFilter}
        selected={selected}
        content={
          <View>
            {modalData.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    key={index}
                    onPress={item.job}
                    style={[common.rowBetween]}>
                    <View style={[common.rowCenter]}>
                      {item.icon ? (
                        <Image
                          style={[common.size24, common.mr10]}
                          source={selected ? item.iconOn : item.icon}
                        />
                      ) : null}
                      <Text
                        style={[
                          common.modalText,
                          selected && {color: BLUE.DEFAULT},
                        ]}>
                        {item.value}
                      </Text>
                    </View>
                    {selected ? (
                      <Image style={common.size24} source={iconPath.CHECK} />
                    ) : null}
                  </Pressable>
                </View>
              );
            })}
            {/* button */}
            <View>
              <Pressable style={{width: '100%', marginTop: 40}}>
                <LinearGradient
                  style={common.button}
                  start={{x: 0.1, y: 0.5}}
                  end={{x: 0.6, y: 1}}
                  colors={['#74ebe4', '#3962f3']}>
                  <Text style={common.buttonText}>필터 적용</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16},
});

export default RecruitMapScreen;
