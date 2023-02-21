import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

const windowWidth = Dimensions.get('window').width;

const Toast = forwardRef((props, ref: any) => {
  const [message, setMessage] = useState<any[]>([]);
  const [type, setType] = useState('');

  const toastOpacity = useSharedValue(0);
  const isShowed = useRef(false);
  const width = windowWidth - 32;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    show: show,
  }));

  const turnOnIsShow = useCallback(() => {
    isShowed.current = false;
  }, []);

  const show = useCallback(
    message => {
      if (!isShowed.current) {
        setMessage(message.message);
        setType(message.type);

        isShowed.current = true;
        toastOpacity.value = withSequence(
          withTiming(1, {duration: 600}),
          withTiming(0, {duration: 3000}, () => {
            runOnJS(turnOnIsShow)();
          }),
        );
      }
    },
    [toastOpacity, turnOnIsShow],
  );

  // console.log('토스트 메시지는 뭔데', message);
  // console.log('형식이 뭔데', type);

  return (
    <Animated.View
      style={[styles.rootContainer, animatedStyle, {width: width}]}>
      <View
        style={[
          styles.toast,
          type === 'error' && styles.error,
          type === 'success' && styles.success,
          type === 'warn' && styles.warn,
        ]}>
        {type === 'error' && (
          <Image source={iconPath.TOAST_ERROR} style={common.size24} />
        )}
        {type === 'success' && (
          <Image source={iconPath.TOAST_SUCCESS} style={common.size24} />
        )}
        {type === 'warn' && (
          <Image source={iconPath.TOAST_WARN} style={common.size24} />
        )}

        <Text style={[common.text_m, styles.message]}>{message}</Text>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  toast: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#cbf4d4',
  },
  message: {marginLeft: 8},
  error: {backgroundColor: '#ffd3d6'},
  warn: {backgroundColor: '#ffeec3'},
  success: {backgroundColor: '#cbf4d4'},
});

export default Toast;
