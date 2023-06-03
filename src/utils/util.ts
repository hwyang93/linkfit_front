// email 형식 확인
import moment from 'moment/moment';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {IS_ANDROID, IS_IOS} from './constants/common';
import REGEXP from './constants/regexp';

export const validateEmail = (email: string) => {
  return REGEXP.EMAIL.test(email);
};

export const validatePassword = (password: string) => {
  return REGEXP.PASSWORD.test(password);
};

export const removeWhitespace = (text: string) => {
  return text.replace(REGEXP.WHITE_SPACE, '');
};

export const formatDate = (date: string | number | Date) => {
  const dateObj = new Date(date);
  return moment(dateObj).format('YYYY.MM.DD');
};

export const requestPermission = async () => {
  try {
    if (IS_IOS) {
      return await Geolocation.requestAuthorization('always');
    }

    if (IS_ANDROID) {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
};
