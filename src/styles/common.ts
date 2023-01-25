import {StyleSheet, Dimensions} from 'react-native';
import {BLACK, GRAY, INPUT, WHITE} from './colors';

export const Font = {
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
  ml16: {marginLeft: 16},
  mr8: {marginRight: 8},
  mr10: {marginRight: 10},
  mr16: {marginRight: 16},
  // layout
  separator: {height: 1, backgroundColor: '#dcdcdc'},
  wrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  // text area
  tac: {textAlign: 'center'},
  tal: {textAlign: 'left'},
  tar: {textAlign: 'right'},
  fwb: {fontWeight: '700'},
  text: {
    fontFamily: 'NotoSansKR-Medium',
    color: GRAY.DARK,
    fontSize: +width * 12,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: +width * 18,
  },
  text_s: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 14,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: +width * 20,
  },
  text_m: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 16,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: +width * 24,
  },
  text_l: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 20,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: +width * 24,
  },
  title: {
    color: BLACK,
    fontSize: +width * 20,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: +width * 24,
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
    color: WHITE,
    fontSize: +width * 16,
    fontWeight: '700',
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
  // icon
  KEBAB: {width: 4, height: 16},
  MESSAGE: {width: 24, height: 24},
  FAVORITE: {width: 24, height: 24},
  BOOKMARK: {width: 14, height: 18},
  TAB_BAR_ICON: {width: 24, height: 24},
  BELL: {width: 17, height: 21},
  MY: {width: 16, height: 16},
  LOCATION: {width: 16, height: 16},
  LINK: {width: 24, height: 24},
  CHECK: {width: 24, height: 24},
  CHECK_BOX: {width: 24, height: 24},
  CHECKED_BOX: {width: 24, height: 24},
  PILATES: {width: 24, height: 24},
  YOGA: {width: 24, height: 24},
  CIRCLE_ARROW_RIGHT: {width: 16, height: 16},
});
export default common;
