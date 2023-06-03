// email 형식 확인
import moment from 'moment/moment';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {IS_ANDROID, IS_IOS} from './constants/common';

export const validateEmail = (email: string) => {
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
};

// password 형식 확인
export const validatePassword = (password: string) => {
  // 패스워드 (영문 소문자 또는 대문자 반드시 포함, 숫자 포함, 특수문자 포함, 8~15자 내외
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}/;
  return regex.test(password);
};

// 공백 제거
export const removeWhitespace = (text: string) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};

export const dateFormatter = (date: string | number | Date, format: string) => {
  const dateObj = new Date(date);
  return moment(dateObj).format(format);
};

export const requestPermission = async () => {
  try {
    // IOS 위치 정보 수집 권한 요청
    if (IS_IOS) {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (IS_ANDROID) {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
};
