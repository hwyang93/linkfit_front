import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/constants/common';
import {BLACK, GRAY} from '@styles/colors';
import common, {width} from '@styles/common';
import {useEffect, useRef} from 'react';
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

interface BottomSheetProps {
  children?: React.ReactNode;
  visible: boolean;
  title?: string;
  modalHeight?: number;
  useScroll?: boolean;
  onDismiss: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  title,
  visible,
  modalHeight,
  useScroll = true,
  onDismiss,
}) => {
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
      onDismiss();
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
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
              left: SCREEN_WIDTH / 2,
              right: SCREEN_WIDTH / 2,
            }}
          />
          <View style={common.mt30}>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>

          {useScroll ? (
            <ScrollView
              style={{width: '100%'}}
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          ) : (
            children
          )}
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
});

export default BottomSheet;
