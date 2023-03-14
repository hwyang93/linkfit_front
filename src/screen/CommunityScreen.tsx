import {FlatList, StyleSheet, Text, View} from 'react-native';

import {WHITE} from '@styles/colors';
import common from '@styles/common';

import CommunityTop from '@components/CommunityTop';
import RecommendedPostItem from '@components/RecommendedPostItem';
import {iconPath} from '@util/iconPath';
import FloatingWriteButton from '@components/FloatingWriteButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {fetchCommunityPosts} from '@api/community';
import toast from '@hooks/toast';

function CommunityScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [posts, setPosts] = useState<any[]>([]);

  const getPosts = useCallback(() => {
    const params = {};
    fetchCommunityPosts(params)
      .then(({data}: any) => {
        console.log(data);
        setPosts(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);
  useEffect(() => {
    getPosts();
  }, []);

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

  function renderItem({item}: any) {
    return <RecommendedPostItem item={item} />;
  }

  const moveToForm = () => {
    navigation.navigate('CommunityPostForm');
  };

  return (
    <View style={styles.container}>
      {/* 필터 영역 */}
      <View style={styles.filterContainer}>
        <FlatList
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

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={common.mb16}>
            <Text style={[common.title]}>추천 게시글</Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={[common.separator, common.mv16]} />
        )}
        showsVerticalScrollIndicator={false}
      />

      <FloatingWriteButton
        icon={iconPath.PENCIL_W}
        job={moveToForm}
        bottom={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  filterContainer: {
    paddingVertical: 8,
  },
});

export default CommunityScreen;
