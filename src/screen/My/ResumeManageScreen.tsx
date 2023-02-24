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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {fetchResumes} from '@api/resume';

function ResumeManageScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [resumes, setResumes] = useState<any[]>([]);

  const [selectedResume, setSelectedResume] = useState<any>({});

  const getResumes = useCallback(() => {
    fetchResumes()
      .then(({data}: any) => {
        setResumes(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  useEffect(() => {
    getResumes();
  }, []);

  const MODAL = [
    {
      value: '새 이력서 작성',
      job: () => {
        closeModel();
        navigation.navigate('ResumeForm');
      },
    },
    {
      value: '대표 이력서로 설정',
      job: () => {},
    },
    {
      value: '이려서 이름 변경',
      job: () => {},
    },
    {
      value: '이력서 복제',
      job: () => {},
    },
    {
      value: '미리보기',
      job: () => {
        closeModel();
        navigation.navigate('ResumePreview', {resumeSeq: selectedResume.seq});
      },
    },
    {
      value: '수정',
      job: () => {},
    },
    {
      value: '삭제',
      job: () => {},
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
      {resumes.map((resume, index) => {
        return (
          <View key={index} style={[common.basicBox, common.mb8]}>
            <View style={common.rowCenter}>
              {resume.isMaster === 'Y' && (
                <View style={[styles.box, common.mb8]}>
                  <Text
                    style={[common.text, common.fs10, {color: BLUE.DEFAULT}]}>
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
              <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
            </Pressable>
          </View>
        );
      })}

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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ResumeManageScreen;
