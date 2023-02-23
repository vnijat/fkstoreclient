import {ToastConfigParams} from 'react-native-toast-message';

type ToastVariants = 'success' | 'info' | 'error';

type ToastConfigType = {
  [K in ToastVariants]: (params: ToastConfigParams<any>) => React.ReactNode;
};

export type {ToastConfigType, ToastVariants};
