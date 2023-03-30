import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, WHITE} from '@styles/colors';

import Modal from '@components/ModalSheet';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import TopFilter from '@components/TopFilter';
import common from '@styles/common';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchReceivePositionSuggests} from '@api/member';
import {iconPath} from '@util/iconPath';
import toast from '@hooks/toast';

function ReceivedSuggestionScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [suggests, setSuggests] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const getPositionSuggests = useCallback(() => {
    fetchReceivePositionSuggests()
      .then(({data}: any) => {
        setSuggests(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPositionSuggests();
    }
  }, [isFocused]);

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

  const onSelect = useCallback(
    (modalData: any) => {
      if (selectedFilter === 'period') {
        setMODAL(modalData);
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
        setMODAL2(modalData);
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
    [FILTER, selectedFilter],
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
                  {suggest.createdAt}
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
          onSelect={onSelect}
          content={
            <View>
              {modalData.map((item, index) => {
                return (
                  <View key={index} style={common.modalItemBox}>
                    <Pressable
                      // onPress={() => onClickItem(item)}
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
});

export default ReceivedSuggestionScreen;
