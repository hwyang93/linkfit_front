import {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import {BLACK, GRAY} from '@styles/colors';
import common, {width} from '@styles/common';
import LinearGradient from 'react-native-linear-gradient';
import {iconPath} from '@util/iconPath';

type modalProps = {
  title?: string;
  link?: any;
  modalVisible: any;
  setModalVisible: any;
  modalData: any[];
  job?: () => void;
  modalHeight?: number;
  type?: string;
  onFilter?: () => void;
};

function ModalSheet(props: modalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>();
  const {modalVisible, setModalVisible} = props;
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
    if (props.type === undefined) {
      setModalType('string');
    } else if (props.type === 'button') {
      setModalType('button');
    } else if (props.type === 'check') {
      setModalType('check');
    }
  }, [props.modalVisible, props.type, resetBottomSheet]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const [selected, setSelected] = useState(false);

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            {
              ...styles.bottomSheetContainer,
              transform: [{translateY: translateY}],
              height: props.modalHeight,
              paddingBottom: 32,
            },
          ]}
          {...panResponders.panHandlers}>
          <View style={styles.topBar} />
          {/* 모달 타이틀 */}
          <View style={common.mt16}>
            <Text
              style={[
                styles.modalTitle,
                modalType === 'button' && {marginBottom: 16},
              ]}>
              {props.title}
            </Text>
          </View>
          {/* string type modal */}
          {modalType === 'string' &&
            props.modalData.map((item, index) => {
              return (
                <View key={index} style={styles.itemBox}>
                  <Pressable onPress={item.job}>
                    <Text style={[styles.modalText]}>{item.value}</Text>
                  </Pressable>
                </View>
              );
            })}

          {/* button type modal */}
          {modalType === 'button' &&
            props.modalData.map((item, index) => {
              return (
                <View key={index} style={[common.mv8, {width: '100%'}]}>
                  <Pressable onPress={() => {}}>
                    <LinearGradient
                      style={common.button}
                      start={{x: 0.1, y: 0.5}}
                      end={{x: 0.6, y: 1}}
                      colors={['#74ebe4', '#3962f3']}>
                      {loading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text style={common.buttonText}>{item.value}</Text>
                      )}
                    </LinearGradient>
                  </Pressable>
                </View>
              );
            })}

          {/* check type modal */}

          {modalType === 'check' && (
            <>
              {props.modalData.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={item.job}
                    style={[styles.itemBox, {justifyContent: 'space-between'}]}>
                    <View style={[common.rowCenter]}>
                      {item.icon ? (
                        <Image
                          style={[common.size24, common.mr10]}
                          source={selected ? item.iconOn : item.icon}
                        />
                      ) : null}

                      <Text style={[styles.modalText]}>{item.value}</Text>
                    </View>
                    {selected ? (
                      <Image style={common.size24} source={iconPath.CHECK} />
                    ) : null}
                  </Pressable>
                );
              })}
              {/* button */}
              <Pressable
                onPress={props.onFilter}
                style={{width: '100%', marginTop: 40}}>
                <LinearGradient
                  style={common.button}
                  start={{x: 0.1, y: 0.5}}
                  end={{x: 0.6, y: 1}}
                  colors={['#74ebe4', '#3962f3']}>
                  <Text style={common.buttonText}>필터 적용</Text>
                </LinearGradient>
              </Pressable>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {flex: 1},
  bottomSheetContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    height: 320,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  topBar: {
    position: 'absolute',
    top: 16,
    justifyContent: 'center',
    marginBottom: 16,
    width: 40,
    height: 3,
    backgroundColor: GRAY.DEFAULT,
  },
  modalText: {
    fontFamily: 'NotoSansKR-Medium',
    color: BLACK,
    fontSize: +width * 18,
    fontWeight: 'normal',
    textAlign: 'left',
    lineHeight: +width * 24,
  },
  modalTitle: {
    color: BLACK,
    fontSize: +width * 16,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: +width * 24,
  },
  itemBox: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 19,
  },
});

export default ModalSheet;
