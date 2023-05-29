import {BLUE, WHITE} from '@styles/colors';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {FetchRecruitsResponse} from '@/types/api/recruit';
import {YesNoFlag} from '@/types/common';
import {iconPath} from '@/utils/iconPath';
import {dateFormatter} from '@/utils/util';
import {fetchRecruits} from '@api/recruit';
import Modal from '@components/ModalSheet';
import TopFilter from '@components/TopFilter';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../../AppInner';

interface MyRecruitmentListItemProps {
  onPress: () => void;
  onKebabIconPress: () => void;
  status: string;
  title: string;
  createdAt: string;
  position: string;
}

const MyRecruitmentListItem: React.FC<MyRecruitmentListItemProps> = ({
  onPress,
  onKebabIconPress,
  status,
  title,
  createdAt,
  position,
}) => {
  return (
    <Pressable style={[common.basicBox, common.mv8]} onPress={onPress}>
      <View style={common.rowCenter}>
        <Text style={[common.text_s, common.fcg]}>{createdAt}</Text>
        <Text style={[common.mh8, common.fcg]}>|</Text>
        <Text style={[common.text_s, common.fcg]}>
          {status === 'ING' ? '진행중' : '마감'}
        </Text>
      </View>
      <Text style={[common.title, common.mv8]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[common.text_m, common.fwb]}>{position}</Text>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={onKebabIconPress}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
    </Pressable>
  );
};

// TODO: Screen 이름 매칭 필요 (MyPost -> MyRecruitment)
type Props = NativeStackScreenProps<LoggedInParamList, 'MyPost'>;

const MyRecruitmentScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [recruits, setRecruits] = useState<FetchRecruitsResponse>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const getRecruits = useCallback(() => {
    const params = {isWriter: 'Y' as YesNoFlag};
    fetchRecruits(params)
      .then(({data}) => {
        setRecruits(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  useEffect(() => {
    getRecruits();
  }, [getRecruits]);

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
      value: '진행 여부',
      job: () => {
        setSelectedFilter('status');
        setModalTitle('진행 여부');
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
      value: '진행 중',
      selected: false,
    },
    {
      value: '마감',
      selected: false,
    },
  ]);
  const MODAL3 = [
    {
      value: '공고 수정하기',
      job: () => {},
    },
    {
      value: '공고 복사하기',
      job: () => {},
    },
  ];

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
              filter.value = value ? value : '진행 여부';
            }
            return filter;
          });
        });
      }
      setModalVisible(false);
    },
    [FILTER, MODAL, MODAL2, modalData, selectedFilter],
  );

  const handleMyRecruitmentListItemPress = (recruitSeq: number) => {
    navigation.navigate('ApplicantStatus', {
      recruitSeq,
    });
  };

  const handleKebeabIconPress = () => {
    setModalTitle('더보기');
    setModalData(MODAL3);
    openModal();
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <TopFilter data={FILTER} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={common.mb24}>
          {recruits.map((recruit, index) => (
            <MyRecruitmentListItem
              key={index}
              title={recruit.title}
              position={recruit.position}
              status={recruit.status}
              createdAt={dateFormatter(recruit.createdAt, 'YYYY.MM.DD')}
              onKebabIconPress={handleKebeabIconPress}
              onPress={() => handleMyRecruitmentListItemPress(recruit.seq)}
            />
          ))}
        </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default MyRecruitmentScreen;
