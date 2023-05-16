import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';

import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import Modal from '@components/ModalSheet';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {deleteResume, fetchResumes, updateResumeMaster} from '@api/resume';
import toast from '@hooks/toast';

function ResumeManageScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [resumes, setResumes] = useState<any[]>([]);

  const [selectedResume, setSelectedResume] = useState<any>({});

  const getResumes = useCallback(() => {
    if (isFocused) {
      fetchResumes()
        .then(({data}: any) => {
          setResumes(data);
        })
        .catch((e: any) => {
          Alert.alert(e.message);
        });
    }
  }, [isFocused]);

  const onUpdateResumeMaster = useCallback(() => {
    updateResumeMaster(selectedResume.seq)
      .then(() => {
        closeModel();
        toast.success({message: '대표이력서 설정이 완료되었어요!'});
        getResumes();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [getResumes, selectedResume.seq]);

  const onDeleteResume = useCallback(() => {
    deleteResume(selectedResume.seq)
      .then(() => {
        closeModel();
        toast.success({message: '이력서가 삭제되었습니다.'});
        getResumes();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [getResumes, selectedResume.seq]);

  useEffect(() => {
    getResumes();
  }, [getResumes]);

  const MODAL = [
    {
      value: '새 이력서 작성',
      selected: false,
      // job: () => {
      //   closeModel();
      //   navigation.navigate('ResumeForm');
      // },
    },
    {
      value: '대표 이력서로 설정',
      job: () => onUpdateResumeMaster(),
    },
    {
      value: '이력서 이름 변경',
      selected: false,
    },
    {
      value: '이력서 복제',
      selected: false,
    },
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
      {resumes.map(resume => {
        return (
          <Pressable
            key={'resume_' + resume.seq}
            onPress={() =>
              navigation.navigate('ResumePreview', {
                resumeSeq: resume.seq,
                applySeq: null,
                recruitSeq: null,
              })
            }>
            <View style={[common.basicBox, common.mb8]}>
              <View style={common.rowCenter}>
                {resume.isMaster === 'Y' && (
                  <View style={common.resumeBadge}>
                    <Text
                      style={[
                        common.text,
                        common.fs10,
                        {color: BLUE.DEFAULT, textAlign: 'center'},
                      ]}>
                      대표
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[common.title, common.mb12]} numberOfLines={1}>
                {resume.title}
              </Text>
              <Text style={[common.text_s, {color: GRAY.DARK}]}>
                {resume.updatedAt}
              </Text>
              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={() => {
                  setSelectedResume(resume);
                  openModal();
                }}>
                <Image source={iconPath.KEBAB} style={[common.size24]} />
              </Pressable>
            </View>
          </Pressable>
        );
      })}

      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        content={
          <View>
            {MODAL.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    onPress={item.job}
                    style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text
                      style={[
                        common.modalText,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#d7e0fd',
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ResumeManageScreen;
