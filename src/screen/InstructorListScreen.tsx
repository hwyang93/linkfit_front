import {LoggedInParamList} from '@/../AppInner';
import FilterChip from '@/components/Common/FilterChip';
import InstructorListItem from '@/components/InstructorListItem';
import common from '@/styles/common';
import {FetchInstructorsResponse, Instructor} from '@/types/api/instructor';
import {fetchInstructors} from '@api/instructor';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, 'InstructorList'>;

const InstructorListScreen = ({}: Props) => {
  const [instructors, setInstructors] = useState<FetchInstructorsResponse>();

  const getInstructorsData = useCallback(async () => {
    try {
      const response = await fetchInstructors({
        noPaging: false,
        curPage: 1,
        perPage: 10,
      });
      setInstructors(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    }
  }, []);

  const renderItem = ({item}: {item: Instructor}) => {
    return <InstructorListItem item={item} />;
  };

  useEffect(() => {
    getInstructorsData();
  }, [getInstructorsData]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={{marginHorizontal: 16, marginVertical: 8}}>
          <FilterChip label="포지션" rightIcon />
        </ScrollView>
      </View>
      <FlatList
        contentContainerStyle={{margin: 16}}
        nestedScrollEnabled={true}
        data={instructors}
        keyExtractor={(_, index) => index.toString()}
        decelerationRate="fast"
        renderItem={renderItem}
        snapToAlignment="start"
        ItemSeparatorComponent={() => <View style={common.separator} />}
        ListHeaderComponent={
          <View style={common.mt16}>
            <Text style={[common.title]}>내 주변 강사</Text>
            <Text style={common.text_m}>링크핏의 우수 강사를 확인하세요.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default InstructorListScreen;
