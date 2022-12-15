import {StyleSheet, Dimensions} from 'react-native';

export const fonts = {
  regular: 'NotoSansKR-Regular',
  medium: 'NotoSansKR-Medium',
  bold: 'NotoSansKR-Bold',
};

export const basicDimensions = {
  height: 740,
  width: 360,
};

export const fullWidth = Dimensions.get('window').width;
export const fullHeight = Dimensions.get('window').height;

export const height = // 높이 변환 작업
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2);

export const width = // 가로 변환 작업
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2);

const common = StyleSheet.create({
  // space area
  mv10: {marginVertical: 10},
  mv20: {marginVertical: 20},
  mv30: {marginVertical: 30},
  mv40: {marginVertical: 40},
  mt10: {marginTop: 10},
  mt20: {marginTop: 20},
  mt30: {marginTop: 30},
  mt40: {marginTop: 40},
  mb10: {marginBottom: 10},
  mb20: {marginBottom: 20},
  mb30: {marginBottom: 30},
  mb40: {marginBottom: 40},
  // text area
  tac: {textAlign: 'center'},
  text: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: +width * 16,
    textAlign: 'center',
  },
});
export default common;
