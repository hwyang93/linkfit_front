import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';

function CertifyInstructorScreen() {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const DATA = [
    {
      id: 1,
      field: '필라테스',
      issuer: '자격증 발급기관',
      date: '2022.12.21 발급',
      status: '인증 대기중',
    },
    {
      id: 2,
      field: '요가',
      issuer: '자격증 발급기관',
      date: '2022.12.21 발급',
      status: '인증 승인',
    },
    {
      id: 3,
      field: '필라테스',
      issuer: '자격증 발급기관',
      date: '2022.12.21 발급',
      status: '인증 거부',
    },
  ];
  const MODAL = [
    {
      value: '인증 취소하기',
      job: () => {},
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {DATA.map((item, index) => {
          return (
            <View key={index} style={styles.box}>
              <Text style={[common.title, common.mb8]}>{item.field}</Text>
              <Text style={[common.title_s, common.mb8]}>{item.issuer}</Text>
              <Text style={common.text_s}>
                {item.date} | {item.status}
              </Text>
              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={openModal}>
                <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
              </Pressable>
            </View>
          );
        })}
      </View>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={MODAL}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  box: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});
export default CertifyInstructorScreen;
