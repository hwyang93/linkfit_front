import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.container}>
      <Text style={common.text_m}>쪽지 화면</Text>
      <Button title={'로그인화면'} onPress={() => navigation.navigate(ROUTE.AUTH.SIGN_IN_EMAIL)} />

      <Button title={'My 센터'} onPress={() => navigation.navigate('MyCenter')} />
      <Button title={'모달 샘플'} onPress={() => setModalVisible(true)} />
      <Button title={'토스트 샘플'} onPress={toastTest} />
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'타이틀'}
        content={
          <View>
            {MODAL_DATA.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    // onPress={() => onClickItem(item)}
                    style={[common.rowCenterBetween, { width: '100%' }]}>
                    <Text style={[common.modalText, item.selected && { color: BLUE.DEFAULT }]}>
                      {item.value}
                    </Text>
                    {item.selected && <Image source={iconPath.CHECK} style={common.size24} />}
                  </Pressable>
                  <Button title={'토스트 샘플'} onPress={toastTest} />
                </View>
              );
            })}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});
