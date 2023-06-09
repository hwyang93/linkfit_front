import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import {FetchReceivePositionSuggestsResponse} from '@/types/api/member';
import {formatDate} from '@/utils/util';
import {fetchReceivePositionSuggests} from '@api/member';
import toast from '@hooks/toast';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../../AppInner';

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
        {type === 'COMPANY' ? companyName : writerName}
      </Text>
      <Text style={[common.text_s, common.fcg]}>
        {closingDate ? closingDate : '채용시 마감'} | {status}
      </Text>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'ReceivedSuggestion'>;

const ReceivedSuggestionScreen = ({navigation}: Props) => {
  const [suggests, setSuggests] =
    useState<FetchReceivePositionSuggestsResponse>();

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

  const handleSuggestionCardPress = (seq: number) => {
    navigation.navigate('ReceivedSuggestionDetail', {
      suggestSeq: seq,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getPositionSuggests();
    }
  }, [isFocused, getPositionSuggests]);

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

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <FilterChipContainer>
        <FilterChip label="기간" style={{marginRight: 8}} />
        <FilterChip label="답변 여부" />
      </FilterChipContainer>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 16, marginBottom: 24}}
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
            status={item.status}
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
          //     {suggest.writer.type === 'COMPANY'
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default ReceivedSuggestionScreen;
