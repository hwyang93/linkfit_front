import {FlatList, StyleSheet, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import LinkTop from '@components/LinkTop';
import InstructorListItem from '@components/InstructorListItem';
import {iconPath} from '@util/iconPath';
import FloatingWriteButton from '@components/FloatingWriteButton';
import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';

function Link() {
  const INSTRUCTORS = [
    {
      field: '필라테스',
      career: '3년',
      nickname: '사오정',
      certification: true,
      address: '서울 · 송파구 · 신천동',
      hit: 23,
    },
    {
      field: '요가',
      career: '32년',
      nickname: '그램마',
      certification: true,
      address: '서울 · 송파구 · 지옥동',
      hit: 444,
    },
    {
      field: '태권',
      career: '1년',
      nickname: '박병장',
      certification: false,
      address: '서울 · 종로구 · 신길동',
      hit: 36,
    },
    {
      field: '태권',
      career: '1년',
      nickname: '박병장',
      certification: true,
      address: '서울 · 종로구 · 신길동',
      hit: 36,
    },
    {
      field: '태권',
      career: '1년',
      nickname: '박병장',
      certification: false,
      address: '서울 · 종로구 · 신길동',
      hit: 36,
    },
  ];
  // const DATA = ['구인 공고 등록', '구직 공고 등록'];
  const DATA = [
    {
      value: '구인 공고 등록',
      link: 'JobOfferForm',
    },
    {
      value: '구직 공고 등록',
      link: '',
    },
  ];

  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={INSTRUCTORS}
        renderItem={renderItem}
        ListHeaderComponent={<LinkTop />}
        ItemSeparatorComponent={() => <View style={common.separator} />}
      />
      <FloatingWriteButton
        icon={iconPath.PENCIL_W}
        setModalVisible={setModalVisible}
      />
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'공고 등록하기'}
        modalData={DATA}
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

export default Link;
