import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import { useReceivedPositionSuggestionList } from '@/hooks/member/use-received-position-suggestion-list';
import useFilter from '@/hooks/use-filter';
import useModal from '@/hooks/use-modal';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import FILTER from '@/lib/constants/filter';
import { ROUTE } from '@/lib/constants/route';
import { formatDate } from '@/lib/util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

interface ReceivedSuggestionCardProps {
  type: string;
  title: string;
  companyName: string;
  writerName: string;
  closingDate: string;
  status: string;
  timestamp: string;
  onPress: () => void;
}

const ReceivedSuggestionCard: React.FC<ReceivedSuggestionCardProps> = ({
  type,
  title,
  companyName,
  writerName,
  closingDate,
  status,
  timestamp,
  onPress,
}) => {
  return (
    <Pressable style={[common.basicBox, common.mv8]} onPress={onPress}>
      <Text style={[common.text_s, common.fcg, common.mb12]}>{timestamp}</Text>
      <Text style={[common.title, common.mb12]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[common.text_m, common.fwb, common.mb12]}>
        {type === MEMBER_TYPE.COMPANY ? companyName : writerName}
      </Text>
      <Text style={[common.text_s, common.fcg]}>
        {closingDate ? closingDate : '채용시 마감'} | {status}
      </Text>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<
  LoggedInParamList,
  typeof ROUTE.MY.RECEIVED_POSITION_SUGGESTION_LIST
>;

export const ReceivedPositionSuggestionListScreen = ({ navigation }: Props) => {
  const periodFilter = useFilter();
  const replyOrNotFilter = useFilter();

  const periodModal = useModal();
  const replyOrNotModal = useModal();

  const filterActive = !!periodFilter.value || !!replyOrNotFilter.value;

  const resetFilter = () => {
    periodFilter.reset();
    replyOrNotFilter.reset();
  };

  const { data } = useReceivedPositionSuggestionList();
  const suggests = data;

  const handlePeriodOptionPress = (option: string) => {
    periodFilter.setValue(option);
    periodModal.close();
  };

  const handleAnswerOptionPress = (option: string) => {
    replyOrNotFilter.setValue(option);
    replyOrNotModal.close();
  };

  const handleSuggestionCardPress = (seq: number) => {
    navigation.navigate(ROUTE.MY.RECEIVED_POSITION_SUGGESTION_DETAIL, {
      suggestSeq: seq,
    });
  };

  // <View>
  //   {modalData.map((item, index) => {
  //     return (
  //       <View key={index} style={common.modalItemBox}>
  //         <Pressable
  //           onPress={() => onSelectFilter(item)}
  //           style={[common.rowCenterBetween, {width: '100%'}]}>
  //           <Text
  //             style={[
  //               common.modalText,
  //               item.selected && {color: BLUE.DEFAULT},
  //             ]}>
  //             {item.value}
  //           </Text>
  //           {item.selected && (
  //             <Image source={iconPath.CHECK} style={common.size24} />
  //           )}
  //         </Pressable>
  //       </View>
  //     );
  //   })}
  // </View>;

  const periodFilterLabel =
    FILTER.PERIOD[periodFilter.value as keyof typeof FILTER.PERIOD] || '기간';
  const replyOrNotFilterLabel =
    FILTER.REPLY_OR_NOT[replyOrNotFilter.value as keyof typeof FILTER.REPLY_OR_NOT] || '답변 여부';

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <FilterChipContainer>
        {filterActive && (
          <FilterChip
            label="초기화"
            style={{ marginRight: 8 }}
            variant="reset"
            onPress={resetFilter}
          />
        )}
        <FilterChip
          label={periodFilterLabel}
          active={!!periodFilter.value}
          style={{ marginRight: 8 }}
          rightIcon
          onPress={periodModal.open}
        />
        <FilterChip
          label={replyOrNotFilterLabel}
          active={!!replyOrNotFilter.value}
          rightIcon
          onPress={replyOrNotModal.open}
        />
      </FilterChipContainer>
      <ScrollView
        contentContainerStyle={{ marginHorizontal: 16, marginBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        {suggests?.map((item, index) => (
          <ReceivedSuggestionCard
            key={index}
            timestamp={formatDate(item.createdAt)}
            type={item.writer.type || ''}
            title={item.title}
            companyName={item.writer.company?.companyName || ''}
            writerName={item.writer.name}
            closingDate={item.closingDate || ''}
            status={FILTER.REPLY_OR_NOT[item.status as keyof typeof FILTER.REPLY_OR_NOT]}
            onPress={() => handleSuggestionCardPress(item.seq)}
          />
          // <Pressable
          //   key={index}
          //   style={[common.basicBox, common.mv8]}
          //   onPress={() =>
          //     navigation.navigate('ReceivedSuggestionDetail', {
          //       suggestSeq: suggest.seq,
          //     })
          //   }>
          //   <Text style={[common.text_s, common.fcg, common.mb12]}>
          //     {formatDate(suggest.createdAt)}
          //   </Text>
          //   <Text style={[common.title, common.mb12]} numberOfLines={1}>
          //     {suggest.title}
          //   </Text>
          //   <Text style={[common.text_m, common.fwb, common.mb12]}>
          //     {suggest.writer.type === Member.Company
          //       ? suggest.writer.company.companyName
          //       : suggest.writer.name}
          //   </Text>
          //   <Text style={[common.text_s, common.fcg]}>
          //     {!suggest.closingDate ? '채용시 마감' : suggest.closingDate} |{' '}
          //     {suggest.status}
          //   </Text>
          // </Pressable>
        ))}
      </ScrollView>
      <BottomSheet visible={periodModal.visible} onDismiss={periodModal.close} title="기간">
        {Object.entries(FILTER.PERIOD).map(([value, label], index) => (
          <BottomSheetOption
            key={index}
            label={label}
            selected={value === periodFilter.value}
            onPress={() => handlePeriodOptionPress(value)}
          />
        ))}
      </BottomSheet>
      <BottomSheet
        visible={replyOrNotModal.visible}
        onDismiss={replyOrNotModal.close}
        title="답변 여부">
        {Object.entries(FILTER.REPLY_OR_NOT).map(([value, label], index) => (
          <BottomSheetOption
            key={index}
            label={label}
            selected={value === replyOrNotFilter.value}
            onPress={() => handleAnswerOptionPress(value)}
          />
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
});
