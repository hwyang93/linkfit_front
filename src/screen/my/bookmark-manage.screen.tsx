import { LoggedInParamList } from '@/../AppInner';
import { fetchBookmarkCommunities } from '@/api/community';
import { fetchBookmarkRecruits } from '@/api/recruit';
import RecruitListItem from '@/components/Compound/RecruitListItem';
import BookmarkCounter from '@/components/Counter/BookmarkCounter';
import EmptySet from '@/components/EmptySet';
import toast from '@/hooks/toast';
import { useAppNavigation } from '@/hooks/use-app-navigation';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { materialTopTabNavigationOptions } from '@/lib/options/tab';
import { formatDate } from '@/lib/util';
import common from '@/styles/common';
import { FetchBookmarkCommunitiesResponse } from '@/types/api/community.type';
import { FetchBookmarkRecruitsResponse } from '@/types/api/recruit.type';
import { YesNoFlag } from '@/types/common';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GRAY, WHITE } from '@styles/colors';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface BookmarkCommunityListItemProps {
  postId: number;
  title: string;
  writerType: string;
  writerCompanyName: string;
  writerName: string;
  updatedAt: string;
  contents: string;
  isBookmarked: YesNoFlag;
  bookmarkCount: number;
  commentsLength: number;
  category: string;
  onPress?: () => void;
}

const BookmarkCommunityListItem: React.FC<BookmarkCommunityListItemProps> = ({
  postId,
  title,
  writerType,
  writerCompanyName,
  writerName,
  updatedAt,
  contents,
  isBookmarked,
  bookmarkCount,
  commentsLength,
  category,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.listBox}>
        <Text style={[common.title, common.fs18, common.mb8]}>{title}</Text>
        {writerType === MEMBER_TYPE.COMPANY ? (
          <View style={common.row}>
            <Text style={[common.text_m, common.fwb]}>{writerCompanyName}</Text>
            <Text style={[common.text, common.mh4, { alignSelf: 'flex-end' }]}>센터</Text>
            <Text style={[common.text, { alignSelf: 'flex-end' }]}>{updatedAt}</Text>
          </View>
        ) : (
          <View style={common.row}>
            <Text style={[common.text_m, common.fwb]}>{writerName}</Text>
            <Text style={[common.text, common.mh4, { alignSelf: 'flex-end' }]}>
              {writerType === MEMBER_TYPE.INSTRUCTOR ? '강사' : '일반인'}
            </Text>
            <Text style={[common.text, { alignSelf: 'flex-end' }]}>{updatedAt}</Text>
          </View>
        )}

        <Text style={[common.mb16, common.text_m]}>{contents}</Text>
        <View style={common.rowCenterBetween}>
          <View style={common.rowCenter}>
            <View style={[common.rowCenter, common.mr10]}>
              <BookmarkCounter isBookmark={isBookmarked} counter={bookmarkCount} postId={postId} />
              <Pressable>
                <Image source={iconPath.BOOKMARK_ON} style={common.size24} />
              </Pressable>
              <Text style={[common.text_m, common.fwb]}>{bookmarkCount}</Text>
            </View>
            <View style={common.rowCenter}>
              <Image source={iconPath.COMMENT} style={common.size24} />
              <Text style={[common.text_m, common.fwb]}>{commentsLength}</Text>
            </View>
          </View>
          <View style={styles.labelBox}>
            <Text style={common.text_m}>{category}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const Tab = createMaterialTopTabNavigator();

const JobOfferTab: React.FC = () => {
  const [bookmarkedRecruits, setBookmarkedRecruits] = useState<FetchBookmarkRecruitsResponse>();

  const navigation = useAppNavigation();

  const getBookmarkRecruits = useCallback(() => {
    fetchBookmarkRecruits()
      .then(({ data }) => {
        setBookmarkedRecruits(data);
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, []);

  useEffect(() => {
    getBookmarkRecruits();
  }, [getBookmarkRecruits]);

  return (
    <View style={styles.container}>
      {bookmarkedRecruits && bookmarkedRecruits.length > 0 && (
        <FlatList
          contentContainerStyle={{ marginTop: 16, paddingBottom: 48 }}
          data={bookmarkedRecruits}
          renderItem={({ item }) => (
            <RecruitListItem
              seq={item.seq}
              position={item.recruit.position}
              title={item.recruit.title}
              companyName={item.recruit.companyName}
              address={item.recruit.address}
              bookmarkChecked={item.recruit.isBookmark === 'Y'}
              imageSrc={item.recruit.writer?.profileImage?.originFileUrl}
              onPress={() => navigation.navigate('JobPost', { recruitSeq: item.seq })}
            />
          )}
          numColumns={2}
          keyExtractor={(item) => 'bookmarkedRecruit' + item.seq}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
        />
      )}
      {bookmarkedRecruits && bookmarkedRecruits.length === 0 && (
        <EmptySet text="북마크한 구인 공고가 없어요." />
      )}
    </View>
  );
};

const CommunityTab: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<FetchBookmarkCommunitiesResponse>();

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const getBookmarkCommunities = useCallback(() => {
    fetchBookmarkCommunities()
      .then(({ data }) => {
        setBookmarks(data);
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, []);

  useEffect(() => {
    getBookmarkCommunities();
  }, [getBookmarkCommunities]);

  return (
    <View style={styles.container}>
      {bookmarks && bookmarks.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {bookmarks.map((bookmark, index) => (
            <BookmarkCommunityListItem
              key={index}
              postId={bookmark.community.seq}
              title={bookmark.community.title}
              writerType={bookmark.community.writerType}
              writerCompanyName={bookmark.community.writerCompanyName}
              writerName={bookmark.community.writerName}
              updatedAt={formatDate(bookmark.community.updatedAt)}
              contents={bookmark.community.contents}
              isBookmarked={bookmark.community.isBookmark}
              bookmarkCount={bookmark.community.bookmarkCount}
              commentsLength={bookmark.community.commentsLength}
              category={bookmark.community.category}
              onPress={() =>
                navigation.navigate(ROUTE.COMMUNITY.POST_DETAIL, {
                  postId: bookmark.community.seq,
                })
              }
            />
          ))}
        </ScrollView>
      )}
      {bookmarks && bookmarks.length === 0 && <EmptySet text="북마크한 커뮤니티 글이 없어요." />}
    </View>
  );
};

export const BookmarkManageScreen = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="구인공고" component={JobOfferTab} />
      <Tab.Screen name="커뮤니티" component={CommunityTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
  },
  labelBox: {
    backgroundColor: '#d7e0fd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  listBox: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
    paddingVertical: 16,
  },
});
