import {BLACK, GRAY} from '@styles/colors';
import common, {width} from '@styles/common';
import {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type BottomSheetProps = {
  visible: boolean;
  title?: string;
  content?: React.ReactNode;
  modalHeight?: number;
  type?: 'button' | 'select' | 'tab';
  onClose: () => void;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  title,
  visible,
  modalHeight,
  type,
  content,
  onClose,
}) => {
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
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 0) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      resetBottomSheet.start();
    }
  }, [visible, resetBottomSheet]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
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
              height: modalHeight,
              paddingBottom: 32,
              maxHeight: '93%',
            },
          ]}>
          <View
            style={styles.topBar}
            {...panResponders.panHandlers}
            hitSlop={{
              top: 32,
              bottom: 32,
              left: Dimensions.get('screen').width / 2,
              right: Dimensions.get('screen').width / 2,
            }}
          />
          {/* 모달 타이틀 */}
          <View style={common.mt16}>
            <Text
              style={[
                styles.modalTitle,
                type === 'button' && {marginBottom: 16},
                type === 'select' && {marginBottom: 16},
                type === 'tab' && {marginBottom: 16},
              ]}>
              {title}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {content}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

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
    zIndex: 9999,
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

export default BottomSheet;
