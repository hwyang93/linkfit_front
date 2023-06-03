import {IS_ANDROID, IS_IOS} from '@/utils/constants/common';
import SHOW_TOAST_MESSAGE from '@/utils/constants/toast';
import {iconPath} from '@/utils/iconPath';
import common from '@styles/common';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  DeviceEventEmitter,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Colors = {
  info: string;
  success: string;
  warn: string;
  error: string;
};

type Icons = {
  info: any;
  success: any;
  warn: any;
  error: any;
};

const colors = {
  info: '#cae9ff',
  success: '#cbf4d4',
  warn: '#ffeec3',
  error: '#ffd3d6',
} as Colors;

const icons = {
  info: iconPath.TOAST_INFO,
  success: iconPath.TOAST_SUCCESS,
  warn: iconPath.TOAST_INFO,
  error: iconPath.TOAST_ERROR,
} as Icons;

type ToastData = {
  useNativeToast?: boolean;
  message: string;
  duration?: number;
  type: keyof Colors | keyof Icons;
};

const Toast: React.FC = () => {
  const [messageType, setMessageType] = useState<
    null | keyof Colors | keyof Icons
  >(null);
  const [message, setMessage] = useState<string | null>(null);
  const [timeOutDuration, setTimeOutDuration] = useState(2000);

  const timeOutRef = useRef<NodeJS.Timer | null>(null);

  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  }, []);

  const onNewToast = (data: ToastData) => {
    if (IS_ANDROID && data.useNativeToast) {
      return ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
    if (data.duration) {
      setTimeOutDuration(data.duration);
    }
    setMessage(data.message);
    setMessageType(data.type);
  };

  const closeToast = useCallback(() => {
    setMessage(null);
    setTimeOutDuration(2000);
    animatedOpacity.value = withTiming(0);
    clearInterval(timeOutRef.current as NodeJS.Timeout);
  }, [animatedOpacity]);

  useEffect(() => {
    if (message) {
      timeOutRef.current = setInterval(() => {
        if (timeOutDuration === 0) {
          closeToast();
        } else {
          setTimeOutDuration(prev => prev - 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeOutRef.current as NodeJS.Timeout);
    };
  }, [closeToast, message, timeOutDuration]);

  useEffect(() => {
    if (message) {
      animatedOpacity.value = withTiming(1, {duration: 1000});
    }
  }, [message, animatedOpacity]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!message) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {backgroundColor: messageType ? colors[messageType] : 'blue'},
        animatedStyle,
      ]}>
      <TouchableOpacity onPress={closeToast} style={common.rowCenterBetween}>
        <View style={common.rowCenter}>
          <Image
            source={messageType ? icons[messageType] : null}
            style={common.size24}
          />
          <Text style={[styles.text, common.text_m]}>{message}</Text>
        </View>
        {IS_IOS && (
          <Image source={iconPath.TOAST_CLOSE} style={common.size24} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: '4%',
    left: '4%',
    right: '4%',
    zIndex: 1000,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 1,
    borderRadius: 8,
  },

  text: {
    marginLeft: 8,
    color: '#292929',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default Toast;
