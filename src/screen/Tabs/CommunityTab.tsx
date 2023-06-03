import EmptyState from '@/components/Common/EmptyState';
import FabContainer from '@/components/Common/FabContainer';
import FilterChip from '@/components/Common/FilterChip';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import {FetchCommunityPostsResponse} from '@/types/api/community';
import {CommunityEntity} from '@/types/api/entities';
import {iconPath} from '@/utils/iconPath';
import {fetchCommunityPosts} from '@api/community';
import RecommendedPostItem from '@components/RecommendedPostItem';
import toast from '@hooks/toast';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'Community'>;

const CommunityTab = ({navigation}: Props) => {
  const [posts, setPosts] = useState<FetchCommunityPostsResponse>();

  const isFocused = useIsFocused();

  const renderItem = ({item}: {item: CommunityEntity}) => {
    return <RecommendedPostItem item={item} />;
  };

  const onPressFAB = () => {
    navigation.navigate('CommunityPostForm');
  };

  const getPosts = useCallback(() => {
    fetchCommunityPosts()
      .then(({data}) => {
        setPosts(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPosts();
    }
  }, [getPosts, isFocused]);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          horizontal
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <FilterChip label="필라테스" style={{marginRight: 8}} />
          <FilterChip label="요가" style={{marginRight: 8}} />
          <FilterChip label="강사" style={{marginRight: 8}} />
          <FilterChip label="센터" />
        </ScrollView>
      </View>
      <Text style={[common.title, {margin: 16}]}>최근 게시글</Text>
      {posts?.length !== 0 && (
        <FlatList
          data={posts}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 16,
          }}
          ItemSeparatorComponent={() => (
            <View style={[common.separator, common.mv16]} />
          )}
        />
      )}
      {posts?.length === 0 && <EmptyState />}
      <FabContainer style={{bottom: 16}}>
        <FloatingActionButton
          iconSource={iconPath.PENCIL_W}
          onPress={onPressFAB}
        />
      </FabContainer>
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
