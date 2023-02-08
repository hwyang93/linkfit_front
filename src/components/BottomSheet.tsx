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
  Image,
  Pressable,
} from 'react-native';
import common, {width} from '@styles/common';
import {BLACK, BLUE, GRAY} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';

type modalProps = {
  title?: string;
  modalVisible: any;
  setModalVisible: any;
  filterData: any[];
};

function BottomSheet(props: modalProps) {
  // console.log('무슨프롭', props);
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
    } else {
      closeBottomSheet.start();
    }
  }, [props.modalVisible, closeBottomSheet, resetBottomSheet]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const [selected, setSelected] = useState(false);

  //todo : height 를 몇개 만들어놓고 셀렉트 항목 개수에 따라서 높이를 조절해야겠다..?

  // filter 선택 함수
  const selectFilter = () => {
    setSelected(!selected);
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
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.topBar} />
          <View style={common.mv16}>
            <Text style={styles.modalTitle}>포지션</Text>
          </View>
          {/* 선택 항목 */}
          <View style={styles.background}>
            <View style={styles.filterBox}>
              <Pressable style={styles.filterItem} onPress={selectFilter}>
                <Image
                  style={[common.size24, common.mr10]}
                  source={selected ? iconPath.LINK_ON : iconPath.LINK}
                />
                <Text
                  style={[styles.modalText, selected && {color: BLUE.DEFAULT}]}>
                  전체
                </Text>
                {/* 클릭되면 보이는 아이콘 */}
                {selected ? (
                  <View style={styles.iconPosition}>
                    <Image style={common.size24} source={iconPath.CHECK} />
                  </View>
                ) : null}
              </Pressable>
            </View>

            <Pressable style={styles.filterBox} onPress={selectFilter}>
              <View style={styles.filterItem}>
                <Image
                  style={[common.size24, common.mr10]}
                  source={selected ? iconPath.PILATES_ON : iconPath.PILATES}
                />
                <Text
                  style={[styles.modalText, selected && {color: BLUE.DEFAULT}]}>
                  필라테스
                </Text>
                {/* 클릭되면 보이는 아이콘 */}
                {selected ? (
                  <View style={styles.iconPosition}>
                    <Image style={common.size24} source={iconPath.CHECK} />
                  </View>
                ) : null}
              </View>
            </Pressable>

            <Pressable style={styles.filterBox} onPress={selectFilter}>
              <View style={styles.filterItem}>
                <Image
                  style={[common.size24, common.mr10]}
                  source={selected ? iconPath.YOGA_ON : iconPath.YOGA}
                />
                <Text
                  style={[styles.modalText, selected && {color: BLUE.DEFAULT}]}>
                  요가
                </Text>
                {/* 클릭되면 보이는 아이콘 */}
                {selected ? (
                  <View style={styles.iconPosition}>
                    <Image style={common.size24} source={iconPath.CHECK} />
                  </View>
                ) : null}
              </View>
            </Pressable>

            {/* button */}
            <View style={{flex: 1, marginTop: 40}}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                <Text style={common.buttonText}>필터 적용</Text>
              </LinearGradient>
            </View>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  topBar: {
    width: 40,
    height: 3,
    backgroundColor: GRAY.DEFAULT,
  },
  filterBox: {flexDirection: 'row', justifyContent: 'flex-start'},
  filterItem: {width: '100%', paddingVertical: 19, flexDirection: 'row'},
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
  iconPosition: {position: 'absolute', top: 16, right: 0},
});

export default BottomSheet;
