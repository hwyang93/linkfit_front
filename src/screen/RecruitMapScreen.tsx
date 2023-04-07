import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import NaverMapView, {Marker} from 'react-native-nmap';
import {iconPath} from '@util/iconPath';
import LocationButton from '@components/LocationButton';
import FloatingLinkButton from '@components/FloatingLinkButton';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaView} from 'react-native-safe-area-context';
import FloatingWriteButton from '@components/FloatingWriteButton';
import Modal from '@components/ModalSheet';
import TopFilter from '@components/TopFilter';
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
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');
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

  const [FILTER, setFILTER] = useState([
    {
      key: 'position',
      value: '포지션',
      job: () => {
        setSelectedFilter('position');
        setModalTitle('포지션');
        setModalData(MODAL);
        openModal();
      },
    },
    {
      key: 'type',
      value: '채용형태',
      job: () => {
        setSelectedFilter('type');
        setModalTitle('채용형태');
        setModalData(MODAL2);
        openModal();
      },
    },
    {
      key: 'time',
      value: '수업시간',
      job: () => {
        setSelectedFilter('time');
        setModalTitle('수업시간');
        setModalData(MODAL3);
        openModal();
      },
    },
  ]);

  const [MODAL, setMODAL] = useState([
    {
      icon: iconPath.LINK,
      iconOn: iconPath.LINK_ON,
      value: '전체',
      selected: false,
    },
    {
      icon: iconPath.PILATES,
      iconOn: iconPath.PILATES_ON,
      value: '필라테스',
      selected: false,
    },
    {
      icon: iconPath.YOGA,
      iconOn: iconPath.YOGA_ON,
      value: '요가',
      selected: false,
    },
  ]);
  const [MODAL2, setMODAL2] = useState([
    {
      value: '전임',
      selected: false,
    },
    {
      value: '파트타임',
      selected: false,
    },
    {
      value: '대강',
      selected: false,
    },
    {
      value: '실장',
      selected: false,
    },
  ]);
  const [MODAL3, setMODAL3] = useState([
    {
      value: '오전',
      selected: false,
    },
    {
      value: '오후',
      selected: false,
    },
    {
      value: '전일',
      selected: false,
    },
    {
      value: '협의',
      selected: false,
    },
  ]);

  const openModal = () => {
    setModalVisible(true);
  };

  const onSelectFilter = useCallback(
    (selectItem: any) => {
      if (selectedFilter === 'position') {
        setMODAL(() => {
          return MODAL.map(item => {
            if (item.value === selectItem.value) {
              item.selected = !item.selected;
            } else {
              item.selected = false;
            }
            return item;
          });
        });
        setFILTER(() => {
          return FILTER.map(filter => {
            if (filter.key === 'position') {
              const value = modalData.find((item: any) => {
                return item.selected;
              })?.value;
              filter.value = value ? value : '포지션';
            }
            return filter;
          });
        });
      } else if (selectedFilter === 'type') {
        setMODAL2(() => {
          return MODAL2.map(item => {
            if (item.value === selectItem.value) {
              item.selected = !item.selected;
            } else {
              item.selected = false;
            }
            return item;
          });
        });
        setFILTER(() => {
          return FILTER.map(filter => {
            if (filter.key === 'type') {
              const value = modalData.find((item: any) => {
                return item.selected;
              })?.value;
              filter.value = value ? value : '채용 형태';
            }
            return filter;
          });
        });
      } else if (selectedFilter === 'time') {
        setMODAL3(() => {
          return MODAL3.map(item => {
            if (item.value === selectItem.value) {
              item.selected = !item.selected;
            } else {
              item.selected = false;
            }
            return item;
          });
        });
        setFILTER(() => {
          return FILTER.map(filter => {
            if (filter.key === 'time') {
              const value = modalData.find((item: any) => {
                return item.selected;
              })?.value;
              filter.value = value ? value : '수업 시간';
            }
            return filter;
          });
        });
      }
      setModalVisible(false);
    },
    [FILTER, MODAL, MODAL2, MODAL3, modalData, selectedFilter],
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        {/* 필터 영역 */}
        <TopFilter data={FILTER} />
        {/* 필터 영역 */}
      </View>
      {/*<NaverMapView*/}
      {/*  style={{width: '100%', height: '100%'}}*/}
      {/*  showsMyLocationButton={false}*/}
      {/*  zoomControl={false}*/}
      {/*  center={{...P0, zoom: 16}}*/}
      {/*  onTouch={(e: {nativeEvent: any}) =>*/}
      {/*    console.warn('onTouch', JSON.stringify(e.nativeEvent))*/}
      {/*  }*/}
      {/*  onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}*/}
      {/*  onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>*/}
      {/*  /!*<Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />*!/*/}
      {/*  {myLocation?.latitude && (*/}
      {/*    <Marker*/}
      {/*      coordinate={{*/}
      {/*        latitude: myLocation.latitude,*/}
      {/*        longitude: myLocation.longitude,*/}
      {/*      }}*/}
      {/*      pinColor="red"*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />*/}
      {/*  <Marker*/}
      {/*    coordinate={P1}*/}
      {/*    pinColor="blue"*/}
      {/*    onClick={() => console.warn('onClick! p1')}*/}
      {/*  />*/}
      {/*</NaverMapView>*/}
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
        content={
          <View>
            {modalData.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    key={index}
                    onPress={() => onSelectFilter(item)}
                    style={[common.rowBetween, {width: '100%'}]}>
                    <View style={[common.rowCenter]}>
                      {item.icon ? (
                        <Image
                          style={[common.size24, common.mr10]}
                          source={item.selected ? item.iconOn : item.icon}
                        />
                      ) : null}
                      <Text
                        style={[
                          common.modalText,
                          item.selected && {color: BLUE.DEFAULT},
                        ]}>
                        {item.value}
                      </Text>
                    </View>
                    {item.selected ? (
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
