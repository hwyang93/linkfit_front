import {LoggedInParamList} from '@/../AppInner';
import {FetchMemberLicencesResponse} from '@/types/api/member';
import {iconPath} from '@/utils/iconPath';
import {cancelMemberLicence, fetchMemberLicences} from '@api/member';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, 'CertifyInstructor'>;

const CertifyInstructorScreen = ({}: Props) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [selectedLicenceSeq, setSelectedLicenceSeq] = useState<number>(0);
  const [licences, setLicenses] = useState<FetchMemberLicencesResponse>([]);

  const getMemberLicences = useCallback(() => {
    fetchMemberLicences()
      .then(({data}) => {
        setLicenses(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMemberLicences()
        .then(({data}) => {
          setLicenses(data);
        })
        .catch(error => {
          toast.error({message: error.message});
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
      .catch(error => {
        toast.error({message: error.message});
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
};
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
