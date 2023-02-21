import {
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
import {SetStateAction, useEffect, useState} from 'react';
import {fetchMemberLicences} from '@api/member';

function CertifyInstructorScreen() {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [licences, setLicenses] = useState<
    [
      {
        updatedAt: string;
        seq: number;
        field: string;
        licenceNumber: string;
        issuer: string;
        status: string;
        licenceFileSeq: number;
      },
    ]
  >([]);

  useEffect(() => {
    fetchMemberLicences()
      .then(({data}: any) => {
        setLicenses(data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {licences.map((item, index) => {
          return (
            <View key={index} style={styles.box}>
              <Text style={[common.title, common.mb8]}>{item.field}</Text>
              <Text style={[common.title_s, common.mb8]}>{item.issuer}</Text>
              <Text style={common.text_s}>
                {item.updatedAt} |{' '}
                {item.status === 'PROCESS'
                  ? '인증대기'
                  : item.status === 'APPROVAL'
                  ? '승인'
                  : '거부'}
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
