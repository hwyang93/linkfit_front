import AppSafeAreaView from '@/components/\bLayout/AppSafeAreaView';
import EmptySet from '@/components/EmptySet';
import { ROUTE } from '@/lib/constants/route';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { LoggedInParamList } from '../../../AppInner';

const MODAL_DATA = [
  {
    value: '일주일',
    selected: false,
  },
  {
    value: '1개월',
    selected: false,
  },
  {
    value: '2개월',
    selected: false,
  },
  {
    value: '3개월 이상',
    selected: false,
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.TAB.MESSAGE>;

export const MessageTab = ({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toastTest = () => {
    toast.success({ message: 'test' });
  };

  return (
    <AppSafeAreaView>
      <EmptySet text="준비중입니다." />
    </AppSafeAreaView>
  );
};
