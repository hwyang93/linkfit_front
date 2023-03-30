import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import {BLUE, WHITE} from '@styles/colors';
import ApplicantListItem from '@components/My/ApplicantListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import TopFilter from '@components/TopFilter';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

function ApplicantWaitingComponent({list}: any) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    setApplications(list);
  }, [list]);
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
      }
      setModalVisible(false);
    },
    [FILTER, selectedFilter],
  );
  return (
    <>
      <View style={{flex: 0, paddingHorizontal: 16, backgroundColor: WHITE}}>
        <TopFilter data={FILTER} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ApplicantListItem list={applications} />
        <View style={{paddingBottom: 24}} />
      </ScrollView>

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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ApplicantWaitingComponent;
