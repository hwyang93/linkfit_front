import EmptyState from '@/components/Common/EmptyState';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import { useCommunityPostListQuery } from '@/hooks/community/use-community-post-list-query';
import { ROUTE } from '@/navigations/routes';
import { useAppSelector } from '@/store';
import { CommunityEntity } from '@/types/api/entities';
import { Member } from '@/types/common';
import MESSAGE from '@/utils/constants/message';
import { iconPath } from '@/utils/iconPath';
import FABContainer from '@components/Common/FABContainer';
import RecommendedPostItem from '@components/RecommendedPostItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'Community'>;

const CommunityTab = ({ navigation }: Props) => {
  const [filterList, setFilterList] = useState<string[]>([]);

  const communityPostListQuery = useCommunityPostListQuery({
    category: filterList,
  });
  const posts = communityPostListQuery.data;

  const userType = useAppSelector((state) => state.user.type);

  const renderItem = ({ item }: { item: CommunityEntity }) => {
    return <RecommendedPostItem item={item} />;
  };

  const onPressFAB = () => {
    navigation.navigate(ROUTE.COMMUNITY.POST_CREATE);
  };

  const handleFilterChipPress = (label: string) => {
    if (filterList.includes(label)) {
      setFilterList(filterList.filter((item) => item !== label));
    } else {
      setFilterList([...filterList, label]);
    }
  };

  return (
    <View style={styles.container}>
      <FilterChipContainer>
        <FilterChip
          label="필라테스"
          active={filterList.includes('필라테스')}
          onPress={() => handleFilterChipPress('필라테스')}
        />
        <FilterChip
          label="요가"
          style={{ marginLeft: 8 }}
          active={filterList.includes('요가')}
          onPress={() => handleFilterChipPress('요가')}
        />
        {userType === Member.Instructor && (
          <FilterChip
            label="강사"
            style={{ marginLeft: 8 }}
            active={filterList.includes('강사')}
            onPress={() => handleFilterChipPress('강사')}
          />
        )}
        {userType === Member.Center && (
          <FilterChip
            label="센터"
            style={{ marginLeft: 8 }}
            active={filterList.includes('센터')}
            onPress={() => handleFilterChipPress('센터')}
          />
        )}
      </FilterChipContainer>
      <Text style={[common.title, { margin: 16 }]}>최근 게시글</Text>
      {posts?.length !== 0 && (
        <FlatList
          data={posts}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 16,
          }}
          ItemSeparatorComponent={() => <View style={[common.separator, common.mv16]} />}
        />
      )}
      {posts?.length === 0 && <EmptyState message={MESSAGE.EMPTY_POST} fullHeight />}
      <FABContainer style={{ bottom: 16 }}>
        <FloatingActionButton iconSource={iconPath.PENCIL_W} onPress={onPressFAB} />
      </FABContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default CommunityTab;
