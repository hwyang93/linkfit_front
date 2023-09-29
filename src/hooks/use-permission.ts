import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { IS_ANDROID, IS_IOS } from '../lib/constants/common';

export const usePermission = () => {
  const checkAndroidLocation = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        console.log('check location :', result);
        if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
          Alert.alert(
            '이 앱은 위치 권한 허용이 필요합니다.',
            '앱 설정 화면을 열어서 허용으로 바꿔주세요.',
            [
              {
                text: '네',
                onPress: () => Linking.openSettings(),
                style: 'default',
              },
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
          );
        }
      })
      .catch(console.error);
  };

  const checkIosLocation = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
          Alert.alert(
            '이 앱은 위치 권한 허용이 필요합니다.',
            '앱 설정 화면을 열어서 허용으로 바꿔주세요.',
            [
              {
                text: '네',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '아니오',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
          );
        }
      })
      .catch(console.error);
  };

  const checkAndroidCamera = () => {
    check(PERMISSIONS.ANDROID.CAMERA)
      .then((result) => {
        if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
          return request(PERMISSIONS.ANDROID.CAMERA);
        } else {
          console.log(result);
          throw new Error('카메라 지원 안 함');
        }
      })
      .catch(console.error);
  };

  const checkIosCamera = () => {
    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        if (result === RESULTS.DENIED || result === RESULTS.LIMITED || result === RESULTS.GRANTED) {
          return request(PERMISSIONS.IOS.CAMERA);
        } else {
          console.log(result);
          throw new Error('카메라 지원 안 함');
        }
      })
      .catch(console.error);
  };

  // 권한 관련
  useEffect(() => {
    if (IS_ANDROID) {
      checkAndroidLocation();
      checkAndroidCamera();
    } else if (IS_IOS) {
      checkIosLocation();
      checkIosCamera();
    }
  }, []);
};
