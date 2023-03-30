import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useCallback, useEffect, useState} from 'react';
import common from '@styles/common';
import LinearGradient from 'react-native-linear-gradient';
import LocationButton from '@components/LocationButton';
import axios from 'axios/index';
import Geolocation from 'react-native-geolocation-service';
import {iconPath} from '@util/iconPath';
import {createRegionAuth, fetchRegionAuth} from '@api/member';
import {SafeAreaView} from 'react-native-safe-area-context';
import toast from '@hooks/toast';

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
    toast.error({message: e.message});
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
  const [authInfo, setAuthInfo] = useState<{
    seq: number;
    region1depth: string;
    region2depth: string;
    region3depth: string;
  } | null>(null);
  const [locationObj, setLocationObj] = useState<{
    region1depth: string;
    region2depth: string;
    region3depth: string;
  } | null>(null);

  let P0 = {latitude: 37.503979, longitude: 127.036201};

  useEffect(() => {
    getAuthInfo();
  }, []);

  const getAuthInfo = useCallback(async () => {
    await fetchRegionAuth()
      .then(({data}: any) => {
        setAuthInfo({
          seq: data.seq,
          region1depth: data.region1depth,
          region2depth: data.region2depth,
          region3depth: data.region3depth,
        });
      })
      .catch((e: any) => {
        console.log(e);
        toast.error({message: e.message});
      });
  }, []);

  const onRegionAuth = useCallback(async () => {
    const data = {
      // lon: myLocation?.longitude,
      // lat: myLocation?.latitude,
      // 임시 위도 경도 지정
      lon: P0.longitude,
      lat: P0.latitude,
      region1depth: locationObj?.region1depth,
      region2depth: locationObj?.region2depth,
      region3depth: locationObj?.region3depth,
    };
    await createRegionAuth(data)
      .then(() => {
        getAuthInfo();
        toast.success({message: '현재 위치로 인증되었어요!'});
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [
    locationObj?.region1depth,
    locationObj?.region2depth,
    locationObj?.region3depth,
    myLocation?.latitude,
    myLocation?.longitude,
  ]);

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

  // const x = '126.9539484';
  // const y = '37.3097165';

  const mapApi = async () => {
    try {
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&x=${P0.longitude}&y=${P0.latitude}`,
          {
            headers: {
              Authorization: 'KakaoAK 39e13da7b6ee3bc9291ca64a8c84ceb8',
            },
          },
        )
        .then(response => {
          const regionInfo = response.data.documents.find((item: any) => {
            return item.region_type === 'B';
          });

          setLocationObj({
            region1depth: regionInfo.region_1depth_name,
            region2depth: regionInfo.region_2depth_name,
            region3depth: regionInfo.region_3depth_name,
          });
        });
    } catch (e: any) {
      console.log(e.message);
      toast.error({message: e.message});
    }
  };

  const canGoNext = true;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView>
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
          <LocationButton bottom={16} />
        </View>
        {authInfo ? (
          <View style={common.mb16}>
            <Text style={[common.text_m, common.fwb]}>인증 위치</Text>

            <View style={styles.locationBox}>
              <View style={common.rowCenter}>
                <Image source={iconPath.MY_PLACE} style={common.size24} />
                <Text style={common.text_m}>
                  {authInfo.region1depth} {authInfo.region2depth}{' '}
                  {authInfo.region3depth}
                </Text>
              </View>
              <Pressable onPress={() => {}} hitSlop={10}>
                <Image source={iconPath.CLOSE} style={common.size24} />
              </Pressable>
            </View>
          </View>
        ) : (
          <></>
        )}

        <View>
          <Text style={[common.text_m, common.mb8]}>현재 위치는</Text>
          <View style={common.row}>
            <Text style={[common.title, common.mr8]}>
              {locationObj?.region1depth} {locationObj?.region2depth}{' '}
              {locationObj?.region3depth}
            </Text>
            <Text style={common.text_m}>입니다.</Text>
          </View>
        </View>

        {/* 완료 버튼 */}
        <View style={common.mt40}>
          <Pressable disabled={!canGoNext} onPress={onRegionAuth}>
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
                <Text style={common.buttonText}>
                  {authInfo ? '현위치로 재인증하기' : '현위치로 인증하기'}
                </Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
  },
});
export default CertifyLocationScreen;
