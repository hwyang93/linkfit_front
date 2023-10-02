import { LoggedInParamList } from '@/../AppInner';
import IconButton from '@/components/Common/IconButton';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import { FetchMemberLicencesResponse } from '@/types/api/member.type';
import { RecruitStatus } from '@/types/api/recruit.type';
import { cancelMemberLicence, fetchMemberLicences } from '@api/member';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.CERTIFY_INSTRUCTOR>;

export const CertifyInstructorScreen = ({}: Props) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLicenceSeq, setSelectedLicenceSeq] = useState(0);
  const [licences, setLicenses] = useState<FetchMemberLicencesResponse>([]);

  const getMemberLicences = useCallback(() => {
    fetchMemberLicences()
      .then(({ data }) => {
        setLicenses(data);
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMemberLicences()
        .then(({ data }) => {
          setLicenses(data);
        })
        .catch((error) => {
          toast.error({ message: error.message });
        });
    }
  }, [isFocused]);

  const onCancelLicence = useCallback(() => {
    cancelMemberLicence(selectedLicenceSeq)
      .then(() => {
        toast.success({ message: '강사 인증 취소되었어요!' });
        setModalVisible(false);
        getMemberLicences();
      })
      .catch((error) => {
        toast.error({ message: error.message });
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

  const handleKebabIconPress = (seq: number) => {
    setSelectedLicenceSeq(seq);
    openModal();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {licences.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={[common.title, common.mb8]}>{item.field}</Text>
            <Text style={[common.title_s, common.mb8]}>{item.issuer}</Text>
            <Text style={common.text_s}>
              {formatDate(item.updatedAt)} |{' '}
              {item.status === RecruitStatus.Processing
                ? '인증 대기중'
                : item.status === RecruitStatus.Approved
                ? '인증 승인'
                : item.status === RecruitStatus.Canceled
                ? '인증 취소'
                : '인증 거부'}
            </Text>
            {item.status === RecruitStatus.Processing && (
              <IconButton
                style={styles.kebabIcon}
                source={iconPath.KEBAB}
                onPress={() => handleKebabIconPress(item.seq)}
              />
            )}
          </View>
        ))}
      </View>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={MODAL}
        content={
          <View>
            {MODAL.map((item, index) => (
              <View key={index} style={common.modalItemBox}>
                <Pressable onPress={item.job} style={[common.rowCenterBetween, { width: '100%' }]}>
                  <Text style={common.modalText}>{item.value}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        }
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  box: {
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    padding: 16,
  },
  container: {
    backgroundColor: WHITE,
    flex: 1,
    padding: 16,
  },
  kebabIcon: { position: 'absolute', right: 16, top: 16 },
});
