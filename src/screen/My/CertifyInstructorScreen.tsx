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
import {iconPath} from '@/utils/iconPath';
import Modal from '@components/ModalSheet';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {cancelMemberLicence, fetchMemberLicences} from '@api/member';
import {useIsFocused} from '@react-navigation/native';
import toast from '@hooks/toast';

function CertifyInstructorScreen() {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [selectedLicenceSeq, setSelectedLicenceSeq] = useState<number>(0);
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

  const getMemberLicences = useCallback(() => {
    fetchMemberLicences({})
      .then(({data}: any) => {
        setLicenses(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMemberLicences({})
        .then(({data}: any) => {
          setLicenses(data);
        })
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    }
  }, [isFocused]);

  const onCancelLicence = useCallback(() => {
    cancelMemberLicence(selectedLicenceSeq)
      .then(() => {
        toast.success({message: '강사 인증 취소되었어요!'});
        setModalVisible(false);
        getMemberLicences();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [getMemberLicences, selectedLicenceSeq]);

  const MODAL = [
    {
      value: '인증 취소하기',
      job: () => {
        onCancelLicence();
      },
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
                  ? '인증 대기중'
                  : item.status === 'APPROVAL'
                  ? '인증 승인'
                  : item.status === 'CANCEL'
                  ? '인증 취소'
                  : '인증 거부'}
              </Text>
              {item.status === 'PROCESS' && (
                <Pressable
                  style={styles.kebabIcon}
                  hitSlop={10}
                  onPress={() => {
                    setSelectedLicenceSeq(item.seq);
                    openModal();
                  }}>
                  <Image source={iconPath.KEBAB} style={[common.size24]} />
                </Pressable>
              )}
            </View>
          );
        })}
      </View>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={MODAL}
        content={
          <View>
            {MODAL.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    onPress={item.job}
                    style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text style={[common.modalText]}>{item.value}</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        }
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
