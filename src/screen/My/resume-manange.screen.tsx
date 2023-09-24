import ResumeCard from '@/components/Compound/ResumeCard';
import { useResumeList } from '@/hooks/resume/use-resume-list';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import { formatDate } from '@/utils/util';
import { deleteResume, updateResumeMaster } from '@api/resume';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useCallback, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.RESUME_MANAGE>;

export const ResumeManageScreen = ({ navigation }: Props) => {
  const [selectedResume, setSelectedResume] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const resumeListQuery = useResumeList();
  const resumes = resumeListQuery.data;

  const onUpdateResumeMaster = useCallback(() => {
    updateResumeMaster(selectedResume.seq)
      .then(() => {
        closeModel();
        toast.success({ message: '대표이력서 설정이 완료되었어요!' });
        resumeListQuery.refetch();
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, [selectedResume.seq]);

  const onDeleteResume = useCallback(() => {
    deleteResume(selectedResume.seq)
      .then(() => {
        closeModel();
        toast.success({ message: '이력서가 삭제되었습니다.' });
        resumeListQuery.refetch();
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, [selectedResume.seq]);

  const MODAL = [
    // {
    //   value: '새 이력서 작성',
    //   selected: false,
    //   // job: () => {
    //   //   closeModel();
    //   //   navigation.navigate('ResumeForm');
    //   // },
    // },
    {
      value: '대표 이력서로 설정',
      job: () => onUpdateResumeMaster(),
    },
    // {
    //   value: '이력서 이름 변경',
    //   selected: false,
    // },
    // {
    //   value: '이력서 복제',
    //   selected: false,
    // },
    {
      value: '미리보기',
      job: () => {
        closeModel();
        navigation.navigate('ResumePreview', {
          resumeSeq: selectedResume.seq,
          applySeq: null,
          recruitSeq: null,
        });
      },
    },
    {
      value: '수정',
      selected: false,
    },
    {
      value: '삭제',
      job: () => {
        Alert.alert('', '삭제하시겠습니까?', [
          {
            text: '취소',
          },
          {
            text: '삭제',
            onPress: () => onDeleteResume(),
            style: 'cancel',
          },
        ]);
      },
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModel = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {resumes?.map((resume) => (
        <ResumeCard
          style={{ marginBottom: 8 }}
          key={resume.seq}
          isMaster={resume.isMaster === 'Y'}
          title={resume.title}
          timestamp={formatDate(resume.updatedAt)}
          kebabIconShown
          onPress={() =>
            navigation.navigate('ResumePreview', {
              resumeSeq: resume.seq,
              applySeq: null,
              recruitSeq: null,
            })
          }
          onKebabIconPress={() => {
            setSelectedResume(resume);
            openModal();
          }}
        />
      ))}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        content={
          <View>
            {MODAL.map((item, index) => (
              <View key={index} style={common.modalItemBox}>
                <Pressable onPress={item.job} style={[common.rowCenterBetween, { width: '100%' }]}>
                  <Text style={[common.modalText, item.selected && { color: BLUE.DEFAULT }]}>
                    {item.value}
                  </Text>
                  {item.selected && <Image source={iconPath.CHECK} style={common.size24} />}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  box: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#d7e0fd',
  },
  kebabIcon: { position: 'absolute', top: 16, right: 16 },
});
