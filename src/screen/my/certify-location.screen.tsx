import { LoggedInParamList } from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import useKakaoLocation from '@/hooks/use-kakao-location';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { requestPermission } from '@/lib/util';
import { FetchRegionAuthResponse } from '@/types/api/member.type';
import { createRegionAuth, deleteRegionAuth, fetchRegionAuth } from '@api/member';
import LocationButton from '@components/LocationButton';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios/index';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.CERTIFY_LOCATION>;

export const CertifyLocationScreen = ({}: Props) => {
  const [loading, setLoading] = useState(false);
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [authInfo, setAuthInfo] = useState<FetchRegionAuthResponse>();
  const [selectedRegion, setSelectedRegion] = useState({ seq: 0 });

  const P0 = { latitude: 37.503979, longitude: 127.036201 };

  const { location, getLocation } = useKakaoLocation({
    latitude: P0.latitude,
    longitude: P0.longitude,
  });

  const getAuthInfo = useCallback(async () => {
    await fetchRegionAuth()
      .then(({ data }) => {
        setAuthInfo(data);
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, []);

  const handleRegionAuthButtonPress = useCallback(async () => {
    if (!location) {
      return;
    }

    setLoading(true);

    const data = {
      // lon: myLocation?.longitude,
      // lat: myLocation?.latitude,
      // 임시 위도 경도 지정
      lon: P0.longitude,
      lat: P0.latitude,
      region1depth: location.region1depth,
      region2depth: location.region2depth,
      region3depth: location.region3depth,
    };

    try {
      await createRegionAuth(data);
      await getAuthInfo();
      toast.success({ message: '현재 위치로 인증되었어요!' });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({ message: error.message });
      }
    } finally {
      setLoading(false);
    }
  }, [P0.latitude, P0.longitude, getAuthInfo, location]);

  const handleDeleteRegionButtonPress = useCallback(async () => {
    try {
      deleteRegionAuth(selectedRegion.seq);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({ message: error.message });
      }
    }
  }, [selectedRegion.seq]);

  useEffect(() => {
    getAuthInfo();
  }, [getAuthInfo]);

  useEffect(() => {
    requestPermission().then((result) => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos) => {
            setMyLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          (error) => {
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
    getLocation();
  }, [getLocation]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView>
        <View style={styles.map}>
          <MapView
            style={{ flex: 1, width: '100%', height: 320 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: P0.latitude,
              longitude: P0.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            loadingEnabled={true}>
            <Marker
              coordinate={{
                latitude: P0.latitude,
                longitude: P0.longitude,
              }}
              pinColor="#2D63E2"
              title="하이"
              description="테스트"
            />
          </MapView>
          <LocationButton bottom={16} />
        </View>

        {authInfo && (
          <View style={common.mb16}>
            <Text style={[common.text_m, common.fwb]}>인증 위치</Text>
            <View style={styles.locationBox}>
              <View style={common.rowCenter}>
                <Image source={iconPath.MY_PLACE} style={common.size24} />
                <Text style={[common.text_m, common.ml8]}>
                  {authInfo.region1depth} {authInfo.region2depth} {authInfo.region3depth}
                </Text>
              </View>
              <Pressable onPress={handleDeleteRegionButtonPress} hitSlop={10}>
                <Image source={iconPath.CLOSE} style={common.size24} />
              </Pressable>
            </View>
          </View>
        )}

        <View>
          <Text style={[common.text_m, common.mb8]}>현재 위치는</Text>
          <View style={common.row}>
            <Text style={[common.title, common.mr8]}>
              {location?.region1depth} {location?.region2depth} {location?.region3depth}
            </Text>
            <Text style={common.text_m}>입니다.</Text>
          </View>
        </View>
        <View style={common.mt40}>
          <CTAButton
            label={authInfo ? '현위치로 재인증하기' : '현위치로 인증하기'}
            onPress={handleRegionAuthButtonPress}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    padding: 16,
  },
  locationBox: {
    alignItems: 'center',
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  map: {
    height: 320,
    marginBottom: 16,
    width: '100%',
  },
});
