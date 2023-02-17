import {StyleSheet, Dimensions, ProgressBarAndroid} from 'react-native';
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
  mh4: {marginHorizontal: 4},
  mv10: {marginVertical: 10},
  mv16: {marginVertical: 16},
  mv20: {marginVertical: 20},
  mv30: {marginVertical: 30},
  mv40: {marginVertical: 40},
  mt8: {marginTop: 8},
  mt10: {marginTop: 10},
  mt16: {marginTop: 16},
  mt20: {marginTop: 20},
  mt24: {marginTop: 24},
  mt30: {marginTop: 30},
  mt40: {marginTop: 40},
  mb8: {marginBottom: 8},
  mb10: {marginBottom: 10},
  mb16: {marginBottom: 16},
  mb20: {marginBottom: 20},
  mb24: {marginBottom: 24},
  mb30: {marginBottom: 30},
  mb40: {marginBottom: 40},
  ml8: {marginLeft: 8},
  ml16: {marginLeft: 16},
  mr4: {marginRight: 4},
  mr8: {marginRight: 8},
  mr10: {marginRight: 10},
  mr16: {marginRight: 16},
  pt16: {paddingTop: 16},
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
  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  rowEnd: {flexDirection: 'row', alignItems: 'flex-end'},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  title_s: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 16,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: +width * 20,
  },
  title: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 20,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: +width * 24,
  },
  title_l: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 24,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: +width * 30,
  },
  fs10: {fontSize: +width * 10},
  fs18: {fontSize: +width * 18},
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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: GRAY.DEFAULT,
  },
  mapBox: {width: '100%', height: 180},
  imgBox: {width: '100%', height: 160, borderRadius: 8},
  // filter box
  filterBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  filterBoxActive: {
    backgroundColor: '#d7e0fd',
    borderWidth: 0,
  },
  filterText: {
    color: GRAY.DARK,
    fontSize: +width * 16,
  },
  filterTextActive: {
    color: '#292929',
    fontSize: +width * 16,
  },
  // channel box
  channelBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  channelText: {
    color: '#292929',
    fontSize: +width * 16,
  },
  //
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 200,
  },

  // icon
  KEBAB: {width: 4, height: 16},
  BOOKMARK: {width: 14, height: 18},
  BELL: {width: 17, height: 21},
  CIRCLE_ARROW_RIGHT: {width: 16, height: 16},
  MY: {width: 18, height: 18},
  size24: {width: 24, height: 24},
  size32: {width: 32, height: 32},
});
export default common;
