import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, WHITE} from '@styles/colors';
import common, {width} from '@styles/common';
import TopFilter from '@components/TopFilter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import {iconPath} from '@/utils/iconPath';
import {fetchRecruitApplicationsMy} from '@api/recruit';
import toast from '@hooks/toast';
import {SafeAreaView} from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 48) / 2;

function ApplicationStatusScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    fetchRecruitApplicationsMy()
      .then(({data}: any) => {
        setApplications(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  const [FILTER, setFILTER] = useState([
    {
      key: 'period',
      value: '기간',
      job: () => {
        setSelectedFilter('period');
        setModalTitle('기간');
        setModalData(MODAL);
        openModal();
      },
    },
    {
      key: 'status',
      value: '지원 상태',
      job: () => {
        setSelectedFilter('status');
        setModalTitle('지원상태');
        setModalData(MODAL2);
        openModal();
      },
    },
  ]);

  const [MODAL, setMODAL] = useState([
    {
      value: '일주일',
      selected: false,
    },
    {
      value: '1개월',
      selected: false,
    },
    {
      value: '2개월',
      selected: false,
    },
    {
      value: '3개월 이상',
      selected: false,
    },
  ]);
  const [MODAL2, setMODAL2] = useState([
    {
      value: '지원완료',
      selected: false,
    },
    {
      value: '지원취소',
      selected: false,
    },
    {
      value: '열람',
      selected: false,
    },
    {
      value: '미열람',
      selected: false,
    },
    {
      value: '합격',
      selected: false,
    },
    {
      value: '불합격',
      selected: false,
    },
  ]);

  const openModal = () => {
    setModalVisible(true);
  };

  const onSelectFilter = useCallback(
    (selectItem: any) => {
      if (selectedFilter === 'period') {
        setMODAL(() => {
          return MODAL.map(item => {
            if (item.value === selectItem.value) {
              item.selected = !item.selected;
            } else {
              item.selected = false;
            }
            return item;
          });
        });
        setFILTER(() => {
          return FILTER.map(filter => {
            if (filter.key === 'period') {
              const value = modalData.find((item: any) => {
                return item.selected;
              })?.value;
              filter.value = value ? value : '기간';
            }
            return filter;
          });
        });
      } else if (selectedFilter === 'status') {
        setMODAL2(() => {
          return MODAL2.map(item => {
            if (item.value === selectItem.value) {
              item.selected = !item.selected;
            } else {
              item.selected = false;
            }
            return item;
          });
        });
        setFILTER(() => {
          return FILTER.map(filter => {
            if (filter.key === 'status') {
              const value = modalData.find((item: any) => {
                return item.selected;
              })?.value;
              filter.value = value ? value : '지원 상태';
            }
            return filter;
          });
        });
      }
      setModalVisible(false);
    },
    [FILTER, MODAL, MODAL2, modalData, selectedFilter],
  );
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* 필터 영역 */}
      <TopFilter data={FILTER} />
      {/* 필터 영역 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 컨첸츠 영역 */}
        <View
          style={{flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 8}}>
          {applications.map((application, index) => {
            return (
              <Pressable
                key={`application${index}`}
                style={styles.itemBox}
                onPress={() =>
                  navigation.navigate('JobPost', {
                    recruitSeq: application.recruit.seq,
                  })
                }>
                <View style={styles.imgBox}>
                  <Image
                    style={styles.img}
                    source={require('assets/images/sample_02.png')}
                  />
                  <View style={[styles.statusBox]}>
                    <Text style={[styles.statusText]}>
                      {(() => {
                        switch (application.status) {
                          case 'APPLY':
                            return '지원 완료';
                          case 'CANCEL':
                            return '지원 취소';
                          case 'OPEN':
                            return '열람';
                          case 'PASS':
                            return '합격';
                          case 'FAIL':
                            return '불합격';
                        }
                      })()}
                    </Text>
                  </View>
                </View>
                <View>
                  {/* 포지션 */}
                  <Text style={[common.text]}>
                    {application.recruit.position}
                  </Text>
                  {/* 제목 */}
                  <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
                    {application.recruit.title}
                  </Text>
                  {/* 업체명 */}
                  <Text style={[common.text_s, common.fwb]}>
                    {application.recruit.companyName}
                  </Text>
                  {/* 지역 */}
                  <Text style={common.text}>{application.createdAt} 지원</Text>
                  <Pressable
                    style={styles.resume}
                    onPress={() =>
                      navigation.navigate('ResumePreview', {
                        resumeSeq: application.resumeSeq,
                        applySeq: application.seq,
                        recruitSeq: application.recruitSeq,
                      })
                    }>
                    <Image source={iconPath.RESUME} style={[common.size24]} />
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* 모달 */}
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={modalTitle}
          modalData={modalData}
          content={
            <View>
              {modalData.map((item, index) => {
                return (
                  <View key={index} style={common.modalItemBox}>
                    <Pressable
                      onPress={() => onSelectFilter(item)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  itemBox: {width: columns2, marginBottom: 16, marginHorizontal: 4},
  imgBox: {
    marginBottom: 8,
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', height: 104, borderRadius: 8},
  statusBox: {
    zIndex: 10,
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  statusText: {
    fontSize: +width * 10,
    color: BLUE.DEFAULT,
  },
  resume: {position: 'absolute', top: 3, right: 0},
});

export default ApplicationStatusScreen;
