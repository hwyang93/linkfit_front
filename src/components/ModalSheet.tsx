import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/lib/constants/common';
import { BLACK, GRAY } from '@styles/colors';
import common, { width } from '@styles/common';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface ModalSheetProps {
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
}

const ModalSheet: React.FC<ModalSheetProps> = (props) => {
  const { modalVisible, setModalVisible } = props;

  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
    toValue: SCREEN_HEIGHT,
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
        if (gestureState.dy > 0) {
          // if (gestureState.dy > 0 && gestureState.vy > 1.5) {
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
    <Modal visible={modalVisible} animationType={'fade'} transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
              ...styles.bottomSheetContainer,
              transform: [{ translateY: translateY }],
              height: props.modalHeight,
              paddingBottom: 32,
              maxHeight: '93%',
            }}>
          <View
            style={styles.topBar}
            {...panResponders.panHandlers}
            hitSlop={{
              top: 32,
              bottom: 32,
              left: SCREEN_WIDTH / 2,
              right: SCREEN_WIDTH / 2,
            }}
          />
          {/* 모달 타이틀 */}
          <View style={common.mt16}>
            <Text
              style={[
                styles.modalTitle,
                props.type === 'button' && { marginBottom: 16 },
                props.type === 'select' && { marginBottom: 16 },
                props.type === 'tab' && { marginBottom: 16 },
              ]}>
              {props.title}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>{props.content}</ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  bottomSheetContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 320,
    padding: 16,
    width: '100%',
  },
  itemBox: {
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
  modalTitle: {
    color: BLACK,
    fontSize: +width * 16,
    fontWeight: '700',
    lineHeight: +width * 24,
    textAlign: 'left',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  selectBox: {
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  topBar: {
    backgroundColor: GRAY.DEFAULT,
    height: 3,
    justifyContent: 'center',
    marginBottom: 16,
    position: 'absolute',
    top: 16,
    width: 40,
    zIndex: 9999,
  },
});

export default ModalSheet;
