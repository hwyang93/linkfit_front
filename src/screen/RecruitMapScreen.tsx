import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {iconPath} from '@util/iconPath';
import Filter, {FilterTypes} from '@components/Filter';
import LocationButton from '@components/LocationButton';
import FloatingLinkButton from '@components/FloatingLinkButton';
import BottomSheet from '@components/BottomSheet';
import {SetStateAction, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  // const [myLocation, setMyLocation] = useState({});
  // const [myLocation, setMyLocation] = useState<
  //   {latitude: number; longitude: number} | string
  // >('');
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
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

  const filterType = [
    {
      id: 1,
      title: '포지션',
    },
    {
      id: 2,
      title: '채용형태',
    },
    {
      id: 3,
      title: '수업시간',
    },
  ];
  const filterData = [
    {
      id: 1,
      title: '포지션',
      icon: true,
      list: [
        {
          value: '전체',
        },
        {
          value: '필라테스',
        },
        {
          value: '요가',
        },
      ],
    },
    {
      id: 2,
      title: '채용형태',
      icon: false,
      list: [
        {
          value: '전임',
        },
        {
          value: '파트타임',
        },
        {
          value: '대강',
        },
        {
          value: '실장',
        },
      ],
    },
    {
      id: 3,
      title: '수업시간',
      icon: false,
      list: [
        {
          value: '오전',
        },
        {
          value: '오후',
        },
        {
          value: '전일',
        },
        {
          value: '협의',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        {filterType.map(function (item, index) {
          return (
            <Filter
              title={item.title}
              index={index}
              filterType={FilterTypes.POSITION}
              setModalVisible={setModalVisible}
              setSelected={setSelected}
            />
          );
        })}

        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filterData={filterData}
        />
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
      {/* 현재 위치로 이동 버튼 */}
      <LocationButton />
      {/* 페이지 이동 버튼 */}
      <FloatingLinkButton
        link={'RecruitList'}
        title={'목록보기'}
        icon={iconPath.LIST}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  filter: {flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16},
});

export default RecruitMapScreen;
