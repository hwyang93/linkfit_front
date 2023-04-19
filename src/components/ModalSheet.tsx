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
} from 'react-native';
import {BLACK, GRAY} from '@styles/colors';
import common, {width} from '@styles/common';

type modalProps = {
  title?: string;
  link?: any;
  modalVisible: any;
  setModalVisible: any;
  modalData?: any[];
  // job?: () => void;
  modalHeight?: number;
  type?: string;
  onFilter?: () => void;
  selected?: boolean;
  onSelect?: any;
  content?: any;
};

function ModalSheetSample(props: modalProps) {
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
  }, [props.modalData, props.modalVisible, props.type, resetBottomSheet]);

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
                props.type === 'button' && {marginBottom: 16},
                props.type === 'select' && {marginBottom: 16},
                props.type === 'tab' && {marginBottom: 16},
              ]}>
              {props.title}
            </Text>
          </View>
          {props.content}
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
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
  },
});

export default ModalSheetSample;
