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
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

const FILTER = [
  {
    value: '전체',
    active: true,
  },
  {
    value: '필라테스',
    active: false,
  },
  {
    value: '요가',
    active: false,
  },
  {
    value: '채널',
    active: false,
  },
  {
    value: '채널',
    active: false,
  },
  {
    value: '채널',
    active: false,
  },
  {
    value: '채널',
    active: false,
  },
  {
    value: '채널',
    active: false,
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, 'Community'>;

const CommunityScreen = ({navigation}: Props) => {
  const [posts, setPosts] = useState<FetchCommunityPostsResponse>([]);

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
      {/* 필터 영역 */}
      <View style={styles.filterContainer}>
        <FlatList
          contentContainerStyle={{marginHorizontal: 16}}
          horizontal={true}
          data={FILTER}
          renderItem={({item}) => (
            <View
              style={[common.filterBox, item.active && common.filterBoxActive]}>
              <Text
                style={[
                  common.filterText,
                  item.active && common.filterTextActive,
                ]}>
                {item.value}
              </Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* 필터 영역 */}
      <View style={{marginHorizontal: 16}}>
        <FlatList
          data={posts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{marginTop: 16}}
          ListHeaderComponent={() => (
            <View style={common.mb16}>
              <Text style={[common.title]}>최근 게시글</Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={[common.separator, common.mv16]} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.fabContainer}>
        <FloatingActionButton
          iconSource={iconPath.PENCIL_W}
          onPress={onPressFAB}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  filterContainer: {
    paddingVertical: 8,
  },
});

export default CommunityScreen;
