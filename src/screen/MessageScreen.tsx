import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {BLACK, BLUE, GRAY, WHITE} from '@styles/colors';
import common, {width} from '@styles/common';
import Modal from '@components/ModalSheet';
import ModalSheetSample from '@components/ModalSheetSample';
import {SetStateAction, useState} from 'react';
import {iconPath} from '@util/iconPath';
import ModalSheetSampleContent from '@components/ModalSheetSampleContent';

function MessageScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

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

  function modalContentRender() {
    return modalData.map((item, index) => {
      return (
        <View key={index} style={styles.itemBox}>
          <Pressable
            // onPress={() => onClickItem(item)}
            style={[common.rowCenterBetween, {width: '100%'}]}>
            <Text
              style={[
                styles.modalText,
                item.selected && {color: BLUE.DEFAULT},
              ]}>
              {item.value}
            </Text>
            {item.selected && (
              <Image source={iconPath.CHECK} style={common.size24} />
            )}
          </Pressable>
        </View>
      );
    });
  }

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
      <ModalSheetSample
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'타이틀'}
        content={
          <View>
            {modalData.map((item, index) => {
              return (
                <View key={index} style={styles.itemBox}>
                  <Pressable
                    // onPress={() => onClickItem(item)}
                    style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text
                      style={[
                        styles.modalText,
                        item.selected && {color: BLUE.DEFAULT},
                      ]}>
                      {item.value}
                    </Text>
                    {item.selected && (
                      <Image source={iconPath.CHECK} style={common.size24} />
                    )}
                  </Pressable>
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

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {flex: 1},
  bottomSheetContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
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
  itemBox: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 19,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
  },
});

export default MessageScreen;
