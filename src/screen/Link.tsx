import {FlatList, StyleSheet, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import LinkTop from '@components/LinkTop';
import InstructorListItem from '@components/InstructorListItem';
import {iconPath} from '@util/iconPath';
import FloatingWriteButton from '@components/FloatingWriteButton';
import Modal from '@components/ModalSheet';
import {SetStateAction, useEffect, useState} from 'react';
import {fetchInstructors} from '@api/instructor';

function Link() {
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

  const [instructors, setInstructors] = useState(() => []);
  useEffect(() => {
    fetchInstructors()
      .then(({data}: any) => {
        console.log('페치한 데이터', data);
        setInstructors(data);
      })
      .catch((e: {message: () => any}) => {
        console.log(e.message());
      });
  }, []);

  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={instructors}
        keyExtractor={(item, index) => index.toString()}
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
