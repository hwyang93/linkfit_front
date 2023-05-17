import {DeviceEventEmitter} from 'react-native';
import {SHOW_TOAST_MESSAGE} from '@/utils/toast';

const toast = {
  info: (options: any) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'info'});
  },
  success: (options: any) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'success'});
  },
  warn: (options: any) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'warn'});
  },
  error: (options: any) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'error'});
  },
};

export default toast;
