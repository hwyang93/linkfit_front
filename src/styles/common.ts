import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/lib/constants/common';
import { StyleSheet } from 'react-native';
import { BLACK, BLUE, GRAY, WHITE } from './colors';

export const Font = {
  regular: 'NotoSansKR-Regular',
  medium: 'NotoSansKR-Medium',
  bold: 'NotoSansKR-Bold',
};

export const basicDimensions = {
  width: 360,
  height: 740,
};

export const height = // 높이 변환 작업
  (SCREEN_HEIGHT * (1 / basicDimensions.height)).toFixed(2);

export const width = // 가로 변환 작업
  (SCREEN_WIDTH * (1 / basicDimensions.width)).toFixed(2);

const common = StyleSheet.create({
  // space area
  mh4: { marginHorizontal: 4 },
  mh8: { marginHorizontal: 8 },
  mv2: { marginVertical: 2 },
  mv4: { marginVertical: 4 },
  mv8: { marginVertical: 8 },
  mv10: { marginVertical: 10 },
  mv12: { marginVertical: 12 },
  mv16: { marginVertical: 16 },
  mv20: { marginVertical: 20 },
  mv30: { marginVertical: 30 },
  mv40: { marginVertical: 40 },
  mt8: { marginTop: 8 },
  mt10: { marginTop: 10 },
  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
  mt24: { marginTop: 24 },
  mt30: { marginTop: 30 },
  mt40: { marginTop: 40 },
  mb8: { marginBottom: 8 },
  mb10: { marginBottom: 10 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },
  mb30: { marginBottom: 30 },
  mb40: { marginBottom: 40 },
  ml8: { marginLeft: 8 },
  ml16: { marginLeft: 16 },
  mr4: { marginRight: 4 },
  mr8: { marginRight: 8 },
  mr10: { marginRight: 10 },
  mr12: { marginRight: 12 },
  mr16: { marginRight: 16 },
  pt16: { paddingTop: 16 },
  // layout
  separator: { backgroundColor: '#dcdcdc', height: 1 },
  wrap: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  containerHeader: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
  },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  rowCenter: { alignItems: 'center', flexDirection: 'row' },
  rowEnd: { alignItems: 'flex-end', flexDirection: 'row' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowCenterBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // text area
  tac: { textAlign: 'center' },
  tal: { textAlign: 'left' },
  tar: { textAlign: 'right' },
  fwb: { fontWeight: '700' },
  text: {
    color: GRAY.DARK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 18,
    textAlign: 'left',
  },
  text_s: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    textAlign: 'left',
  },
  text_m: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    textAlign: 'left',
  },
  text_l: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 24,
    textAlign: 'left',
  },
  title_s: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'left',
  },
  title: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'left',
  },
  title_l: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    textAlign: 'left',
  },
  fs10: { fontSize: +width * 10 },
  fs12: { fontSize: +width * 12 },
  fs14: { fontSize: +width * 14 },
  fs16: { fontSize: +width * 16 },
  fs18: { fontSize: +width * 18 },
  fcg: { color: GRAY.DARK },
  fcb: { color: BLUE.DEFAULT },
  // basic button
  button: {
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    width: '100%',
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
    backgroundColor: '#ffffff',
    color: GRAY.LIGHT,
    fontSize: 12,
    fontWeight: 'bold',
    left: 16,
    paddingHorizontal: 4,
    position: 'absolute',
    top: -4,
    zIndex: 10,
  },
  textInput: {
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
    borderWidth: 2,
    color: '#292929',
    fontSize: 16,
    height: 56,
    padding: 16,
    width: '100%',
  },
  // resume badge
  resumeBadge: {
    backgroundColor: '#d7e0fd',
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 45,
  },
  // select box
  selectWrapper: {
    position: 'relative',
  },
  selectIcon: {
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  // basic box
  basicBox: {
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  mapBox: { height: 180, width: '100%' },
  imgBox: { borderRadius: 8, height: 160, width: '100%' },
  // filter box
  filterBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: GRAY.LIGHT,
    borderRadius: 32,
    borderWidth: 1,
    flex: 0,
    height: 28,
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 12,
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
    backgroundColor: '#d7e0fd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  channelText: {
    color: '#292929',
    fontSize: +width * 16,
  },
  // thumbnail size
  thumbnail: {
    borderRadius: 200,
    height: +width * 48,
    width: +width * 48,
  },
  thumbnail_l: {
    borderRadius: 200,
    height: +width * 64,
    width: +width * 64,
  },
  // icon
  CIRCLE_ARROW_RIGHT: { height: 16, width: 16 },
  size20: { height: 20, width: 20 },
  size24: { height: 24, width: 24 },
  size32: { height: 32, width: 32 },
  size40: { height: 40, width: 40 },
  // modal
  modalItemBox: {
    flexDirection: 'row',
    paddingVertical: 19,
    width: '100%',
  },
  modalText: {
    color: BLACK,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: +width * 18,
    fontWeight: 'normal',
    lineHeight: +width * 24,
    textAlign: 'left',
  },
  modalSelectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // marginVertical: 8,
    borderWidth: 2,
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
  },
  // border gradient button
  gradientBorderBox: {
    alignSelf: 'center',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    width: '100%',
  },
  borderInnerBox: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    margin: 1,
    width: '99%',
  },
  innerText: {
    color: BLUE.DEFAULT,
    textAlign: 'center',
  },
});

export default common;
