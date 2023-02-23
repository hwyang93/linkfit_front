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
} from 'react-native';
import {BLACK, GRAY} from '@styles/colors';
import common, {width} from '@styles/common';
import LinearGradient from 'react-native-linear-gradient';

type modalProps = {
  title?: string;
  link?: any;
  modalVisible: any;
  setModalVisible: any;
  modalData: any[];
  job?: () => void;
  modalHeight?: number;
  type?: string;
};

function ModalSheet(props: modalProps) {
  const [loading, setLoading] = useState<boolean>(false);
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

  const [modalType, setModalType] = useState('string');

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
    if (props.type === 'button') {
      setModalType('button');
    }
  }, [props.modalVisible, props.type]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

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
          {props.type === 'button' &&
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
    width: '100%',
    paddingVertical: 19,
  },
});

export default ModalSheet;
