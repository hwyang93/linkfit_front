import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import {useEffect, useState} from 'react';
import common from '@styles/common';
import LinearGradient from 'react-native-linear-gradient';

function CertifyLocationScreen() {
  const [loading, setLoading] = useState<boolean>(false);

  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });

  let P0 = {latitude: 37.503979, longitude: 127.036201};

  const myLat = useSelector((state: RootState) => state.user.lat);
  const myLon = useSelector((state: RootState) => state.user.lon);
  console.log('지금', location);

  useEffect(() => {
    setLocation({
      latitude: myLat,
      longitude: myLon,
    });
  }, [myLat, myLon]);

  const canGoNext = true;

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={false}
          zoomControl={false}
          center={{...P0, zoom: 16}}
          onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={e =>
            console.warn('onCameraChange', JSON.stringify(e))
          }
          onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
          useTextureView>
          <Marker
            coordinate={P0}
            onClick={() => console.warn('onClick! p0')}
            caption={{text: '현재 위치'}}
          />
        </NaverMapView>
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
    height: 300,
  },
});
export default CertifyLocationScreen;
