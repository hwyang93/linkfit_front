import { SHOW_TOAST_MESSAGE } from '@/lib/constants/toast';
import { DeviceEventEmitter } from 'react-native';

type ToastOptions = {
  message: string;
};

const toast = {
  info: (options: ToastOptions) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'info' });
  },
  success: (options: ToastOptions) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'success' });
  },
  warn: (options: ToastOptions) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'warn' });
  },
  error: (options: ToastOptions) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'error' });
  },
  alert: (options: ToastOptions) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'alert' });
  },
};

export default toast;
