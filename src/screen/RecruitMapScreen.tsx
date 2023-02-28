import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
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

import TopFilter from '@components/TopFilter';

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
  // const [myLocation, setMyLocation] = useState({});
  // const [myLocation, setMyLocation] = useState<
  //   {latitude: number; longitude: number} | string
  // >('');
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selected, setSelected] = useState(2);

  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos: any) => {
            console.log('지금위치', pos);
            setMyLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            // console.log('로케이션 위치', myLocation);
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
      },
    },
    {
      value: '채용형태',
      job: () => {
        setModalTitle('채용형태');
        setModalData(MODAL2);
        openModal();
      },
    },
    {
      value: '수업시간',
      job: () => {
        setModalTitle('수업시간');
        setModalData(MODAL3);
        openModal();
      },
    },
  ];

  const MODAL = [
    {
      icon: iconPath.LINK,
      iconOn: iconPath.LINK_ON,
      value: '전체',
      job: () => {
        let checked = false;
        MODAL.forEach(item => {
          if (item.value !== '전체') {
            if (item.checked) {
              checked = true;
              console.log(checked);
            }
          }
        });
        return checked;

        // Alert.alert('test', 'test');
      },
    },
    {
      icon: iconPath.PILATES,
      iconOn: iconPath.PILATES_ON,
      value: '필라테스',
      checked: false,
      job: () => {
        const index = MODAL.findIndex(item => {
          return item.value === '1개월';
        });
        MODAL[index].checked = !MODAL[index].checked;
      },
    },
    {
      icon: iconPath.YOGA,
      iconOn: iconPath.YOGA_ON,
      value: '요가',
      job: () => {},
    },
  ];
  const MODAL2 = [
    {
      value: '전임',
      job: () => {},
    },
    {
      value: '파트타임',
      job: () => {},
    },
    {
      value: '대강',
      job: () => {},
    },
    {
      value: '실장',
      job: () => {},
    },
  ];
  const MODAL3 = [
    {
      value: '오전',
      job: () => {},
    },
    {
      value: '오후',
      job: () => {},
    },
    {
      value: '전일',
      job: () => {},
    },
    {
      value: '협의',
      job: () => {},
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };
  const onFilter = () => {
    Alert.alert('text', 'filter!');
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        {/* 필터 영역 */}
        <TopFilter data={FILTER} />
        {/* 필터 영역 */}

        {/*<BottomSheet*/}
        {/*  modalVisible={modalVisible}*/}
        {/*  setModalVisible={setModalVisible}*/}
        {/*  filterData={filterData}*/}
        {/*/>*/}
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
      {/* Todo : 플로팅 버튼 컴포넌트 */}
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 40,
  },
  filter: {flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16},
});

export default RecruitMapScreen;
