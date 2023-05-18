import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import Modal from '@components/ModalSheet';

import {SetStateAction, useState} from 'react';
import {iconPath} from '@/utils/iconPath';
import toast from '@hooks/toast';

function MessageScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const toastTest = () => {
    toast.success({message: 'test'});
  };

  const modalData = [
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

  return (
    <View style={styles.container}>
      <Text style={common.text_m}>쪽지 화면</Text>
      <Button
        title={'로그인화면'}
        onPress={() => navigation.navigate('SignIn')}
      />

      <Button
        title={'My 센터'}
        onPress={() => navigation.navigate('MyCenter')}
      />
      <Button title={'모달 샘플'} onPress={() => setModalVisible(true)} />
      <Button title={'토스트 샘플'} onPress={toastTest} />
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'타이틀'}
        content={
          <View>
            {modalData.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    // onPress={() => onClickItem(item)}
                    style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text
                      style={[
                        common.modalText,
                        item.selected && {color: BLUE.DEFAULT},
                      ]}>
                      {item.value}
                    </Text>
                    {item.selected && (
                      <Image source={iconPath.CHECK} style={common.size24} />
                    )}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default MessageScreen;
