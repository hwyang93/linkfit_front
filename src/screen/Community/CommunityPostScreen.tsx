import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import communityPostTop from '@components/Community/CommunityPostTop';
import ReplyComponent from '@components/Community/ReplyComponent';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';
import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';

function CommunityPostScreen() {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const REPLY = [
    {
      id: 1,
      image: iconPath.THUMBNAIL,
      nickname: '이런이름',
      certified: false,
      field: '필라테스',
      career: '경력',
      date: '2022.12.12',
      comment:
        '후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다.후기 내용입니다. 후기 내용입니다. 후기 내용입니다.',
      job: () => {
        openModal();
      },
    },
    {
      id: 2,
      image: iconPath.THUMBNAIL,
      nickname: '오늘내일',
      certified: true,
      field: '요가',
      career: '3년',
      date: '2023.1.12',
      comment:
        '후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다.',
      job: () => {
        openModal();
      },
    },
  ];

  const MODAL = [
    {
      value: '차단하기',
      job: () => {
        setModalVisible(false);
        Alert.alert('text', '차단하라!!');
      },
    },
    {
      value: '신고하기',
      job: () => {
        setModalVisible(false);
        Alert.alert('text', '신고하라!!');
      },
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={REPLY}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <CommunityUserComponent data={item} />
              <ReplyComponent item={item} />
            </View>
          );
        }}
        ListHeaderComponent={communityPostTop}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[common.separator, common.mv16]} />
        )}
      />
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={MODAL}
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
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityPostScreen;
