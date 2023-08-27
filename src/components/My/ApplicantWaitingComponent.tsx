import useModal from '@/hooks/useModal';
import {RecruitApplyEntity} from '@/types/api/entities';
import {iconPath} from '@/utils/iconPath';
import ApplicantListItem from '@components/My/ApplicantListItem';
import TopFilter from '@components/TopFilter';
import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomSheet from '../Common/BottomSheet';

interface ApplicantWaitingComponentProps {
  list: RecruitApplyEntity[];
}

const ApplicantWaitingComponent: React.FC<ApplicantWaitingComponentProps> = ({
  list,
}) => {
  const modal = useModal();

  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  // const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const [FILTER, setFILTER] = useState([
    {
      key: 'period',
      value: '기간',
      job: () => {
        setSelectedFilter('period');
        setModalTitle('기간');
        setModalData(MODAL);
        modal.open();
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
      }
      modal.close();
    },
    [FILTER, MODAL, modalData, modal, selectedFilter],
  );
  return (
    <>
      <View
        style={{
          flex: 0,
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: WHITE,
        }}>
        <TopFilter data={FILTER} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {list.map((item, index) => (
          <ApplicantListItem
            key={index}
            applySeq={item.seq}
            createdAt={item.createdAt}
            recruitSeq={item.recruitSeq}
            resumeSeq={item.resumeSeq}
            resumeTitle={item.resume?.title}
            status={item.status}
          />
        ))}
        <View style={{paddingBottom: 24}} />
      </ScrollView>
      <BottomSheet
        visible={modal.visible}
        onDismiss={modal.close}
        title={modalTitle}>
        <View>
          {modalData.map((item, index) => (
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
          ))}
        </View>
      </BottomSheet>
    </>
  );
};

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
