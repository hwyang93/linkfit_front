import {iconPath} from '@/utils/iconPath';
import {dateFormatter} from '@/utils/util';
import {fetchReceivePositionSuggests} from '@api/member';
import Modal from '@components/ModalSheet';
import TopFilter from '@components/TopFilter';
import toast from '@hooks/toast';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'ReceivedSuggestion'>;

const ReceivedSuggestionScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [suggests, setSuggests] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const isFocused = useIsFocused();

  const getPositionSuggests = useCallback(() => {
    fetchReceivePositionSuggests()
      .then(({data}) => {
        setSuggests(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPositionSuggests();
    }
  }, [isFocused, getPositionSuggests]);

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
      value: '답변 여부',
      job: () => {
        setSelectedFilter('status');
        setModalTitle('답변 여부');
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
      value: '답변 대기중',
      selected: false,
    },
    {
      value: '답변 수락',
      selected: false,
    },
    {
      value: '답변 거절',
      selected: false,
    },
    {
      value: '제안 마감',
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
              filter.value = value ? value : '답변 여부';
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
        {/* 컨텐츠 영역 */}
        <View style={common.mb24}>
          {suggests.map((suggest, index) => {
            return (
              <Pressable
                key={index}
                style={[common.basicBox, common.mv8]}
                onPress={() =>
                  navigation.navigate('ReceivedSuggestionDetail', {
                    suggestSeq: suggest.seq,
                  })
                }>
                <Text style={[common.text_s, common.fcg, common.mb12]}>
                  {dateFormatter(suggest.createdAt, 'YYYY.MM.DD')}
                </Text>
                <Text style={[common.title, common.mb12]} numberOfLines={1}>
                  {suggest.title}
                </Text>
                <Text style={[common.text_m, common.fwb, common.mb12]}>
                  {suggest.writer.type === 'COMPANY'
                    ? suggest.writer.company.companyName
                    : suggest.writer.name}
                </Text>
                <Text style={[common.text_s, common.fcg]}>
                  {!suggest.closingDate ? '채용시 마감' : suggest.closingDate} |{' '}
                  {suggest.status}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {/* 컨텐츠 영역 */}

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default ReceivedSuggestionScreen;
