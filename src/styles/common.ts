import {StyleSheet, Dimensions} from 'react-native';
import {INPUT} from './colors';

export const fonts = {
  regular: 'NotoSansKR-Regular',
  medium: 'NotoSansKR-Medium',
  bold: 'NotoSansKR-Bold',
};

export const basicDimensions = {
  width: 360,
  height: 740,
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
  mv16: {marginVertical: 16},
  mv20: {marginVertical: 20},
  mv30: {marginVertical: 30},
  mv40: {marginVertical: 40},
  mt10: {marginTop: 10},
  mt16: {marginTop: 16},
  mt20: {marginTop: 20},
  mt30: {marginTop: 30},
  mt40: {marginTop: 40},
  mb10: {marginBottom: 10},
  mb16: {marginBottom: 16},
  mb20: {marginBottom: 20},
  mb30: {marginBottom: 30},
  mb40: {marginBottom: 40},
  ml8: {marginLeft: 8},
  mr8: {marginRight: 8},
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
    backgroundColor: '#fff',
  },
  containerHeader: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  // text area
  tac: {textAlign: 'center'},
  tal: {textAlign: 'left'},
  tar: {textAlign: 'right'},
  text: {
    fontFamily: 'NotoSansKR-Medium',
    color: '#292929',
    fontSize: 16,
    textAlign: 'center',
  },
  // basic button
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#dcdcdc',
    borderRadius: 28,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
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
    color: INPUT.DEFAULT,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  textInput: {
    padding: 16,
    width: '100%',
    height: 56,
    color: '#292929',
    fontSize: 16,
    borderWidth: 2,
    borderColor: INPUT.DEFAULT,
    borderRadius: 8,
  },
  // select box
  selectWrapper: {
    position: 'relative',
  },
  selectIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'center',
  },
  // basic box
  basicBox: {
    padding: 16,
    height: 56,
    borderWidth: 2,
    borderColor: INPUT.DEFAULT,
    borderRadius: 8,
  },
});
export default common;
