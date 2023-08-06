import {LoggedInParamList} from '@/../AppInner';
import InstructorListItem from '@/components/Compound/InstructorListItem';
import common from '@/styles/common';
import {FetchInstructorsResponse, Instructor} from '@/types/api/instructor';
import {fetchInstructors} from '@api/instructor';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, 'InstructorList'>;

const InstructorListScreen = ({navigation}: Props) => {
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

  useEffect(() => {
    getInstructorsData();
  }, [getInstructorsData]);

  const blockInstructor = (instructorId: number) => {
    console.log(instructorId);
    // TODO: 강사 차단하기 기능 추가
  };

  const reportInstructor = (instructorId: number) => {
    console.log(instructorId);
    // TODO: 강사 신고하기 기능 추가
  };

  // TODO: 필터 기능 추가

  // TODO: 좋아요 기능 추가

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
      {/* <FilterChipContainer>
        <FilterChip label="포지션" rightIcon />
      </FilterChipContainer> */}
      <FlatList
        contentContainerStyle={{margin: 16}}
        data={instructors}
        keyExtractor={(_, index) => index.toString()}
        decelerationRate="fast"
        snapToAlignment="start"
        ListHeaderComponent={
          <View style={common.mt16}>
            <Text style={[common.title]}>내 주변 강사</Text>
            <Text style={common.text_m}>링크핏의 우수 강사를 확인하세요.</Text>
          </View>
        }
        renderItem={({item}: {item: Instructor}) => (
          <InstructorListItem
            avatarImageSrc={item.profileImage.originFileUrl}
            field={item.field}
            career={item.career}
            nickname={item.nickname}
            address={item.address}
            followerCount={item.followerCount}
            isCertificated
            onBlock={() => blockInstructor(item.seq)}
            onReport={() => reportInstructor(item.seq)}
            onMessageIconPress={() => Alert.alert('click', 'test')}
            onFavoriteIconPress={() => Alert.alert('click', 'test')}
            onAvatarPress={() =>
              navigation.navigate('Profile', {
                memberSeq: item.seq,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={common.separator} />}
      />
    </SafeAreaView>
  );
};

export default InstructorListScreen;
