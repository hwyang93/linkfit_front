import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useEffect, useState} from 'react';
import common from '@styles/common';
import LinearGradient from 'react-native-linear-gradient';
import LocationButton from '@components/LocationButton';
import axios from 'axios/index';
import Geolocation from 'react-native-geolocation-service';

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

// todo : 화면 진입시 위치 좌표 가져오기
// todo : 위치 좌표 현재위치에 바인딩
// todo : 위치 버튼 클릭 시 좌표 재 조회
// todo : 인증하기 버튼 기능

function CertifyLocationScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationObj, setLocationObj] = useState({});

  let P0 = {latitude: 37.503979, longitude: 127.036201};

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
    mapApi();
  }, []);

  console.log('어려워', myLocation);

  const x = '126.9539484';
  const y = '37.3097165';

  const mapApi = async () => {
    try {
      let response = await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`,
          {
            headers: {
              Authorization: 'KakaoAK 39e13da7b6ee3bc9291ca64a8c84ceb8',
            },
          },
        )
        .then(response => {
          const data = response.data.documents[0];
          setLocationObj({
            si: data.address.region_1depth_name,
            gu: data.address.region_2depth_name,
            dong: data.address.region_3depth_name,
          });
        });
      console.log('지금 어디', locationObj);
    } catch (error) {
      console.log(error.message);
    }
  };

  const canGoNext = true;

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={false}
          zoomControl={false}
          center={{...P0, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          // onCameraChange={e =>
          //   console.warn('onCameraChange', JSON.stringify(e))
          // }
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
          useTextureView>
          <Marker
            coordinate={P0}
            onClick={() => console.warn('onClick! p0')}
            caption={{text: '현재 위치'}}
          />
        </NaverMapView>
        <LocationButton />
      </View>
      <View>
        <Text style={[common.text_m, common.mb8]}>현재 위치는</Text>
        <View style={common.row}>
          <Text style={[common.title, common.mr8]}>
            서울특별시 강남구 역삼동
          </Text>
          <Text style={common.text_m}>입니다.</Text>
        </View>
      </View>

      {/* 완료 버튼 */}
      <View style={common.mt40}>
        <Pressable disabled={!canGoNext} onPress={() => {}}>
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
              <Text style={common.buttonText}>현위치로 인증하기</Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  map: {
    marginBottom: 16,
    width: '100%',
    height: 320,
  },
});
export default CertifyLocationScreen;
