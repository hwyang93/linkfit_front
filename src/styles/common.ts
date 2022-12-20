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
  mv10: {marginVertical: +height * 10},
  mv20: {marginVertical: +height * 20},
  mv30: {marginVertical: +height * 30},
  mv40: {marginVertical: +height * 40},
  mt10: {marginTop: +height * 10},
  mt20: {marginTop: +height * 20},
  mt30: {marginTop: +height * 30},
  mt40: {marginTop: +height * 40},
  mb10: {marginBottom: +height * 10},
  mb20: {marginBottom: +height * 20},
  mb30: {marginBottom: +height * 30},
  mb40: {marginBottom: +height * 40},
  // layout
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  container: {
    justifyContent: 'center',
    height: fullHeight,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  // text area
  tac: {textAlign: 'center'},
  text: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: +width * 16,
    textAlign: 'center',
  },
  // basic button
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: +height * 56,
    backgroundColor: '#dcdcdc',
    borderRadius: 28,
  },
  // basic input
  inputWrapper: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 4,
    top: -4,
    left: 16,
    color: '#acacac',
    fontSize: +width * 12,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  textInput: {
    padding: 16,
    width: '100%',
    height: +height * 56,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    // borderColor: isEmail ? SUCCESS.success : CAUTION.caution,
    borderRadius: 8,
  },
});
export default common;
