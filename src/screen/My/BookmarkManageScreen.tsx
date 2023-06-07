import {LoggedInParamList} from '@/../AppInner';
import {fetchBookmarkCommunities} from '@/api/community';
import {fetchBookmarkRecruits} from '@/api/recruit';
import toast from '@/hooks/toast';
import common from '@/styles/common';
import {iconPath} from '@/utils/iconPath';
import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import {formatDate} from '@/utils/util';
import RecruitCarouselItem from '@components/RecruitCarouselItem';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GRAY, WHITE} from '@styles/colors';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface BookmarkCommunityListItemProps {
  title: string;
  writerType: string;
  writerCompanyName: string;
  writerName: string;
  updatedAt: string;
  contents: string;
  bookmarkCount: number;
  commentsLength: number;
  category: string;
  onPress?: () => void;
}

const BookmarkCommunityListItem: React.FC<BookmarkCommunityListItemProps> = ({
  title,
  writerType,
  writerCompanyName,
  writerName,
  updatedAt,
  contents,
  bookmarkCount,
  commentsLength,
  category,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.listBox}>
        <Text style={[common.title, common.fs18, common.mb8]}>{title}</Text>
        {writerType === 'COMPANY' ? (
          <View style={common.row}>
            <Text style={[common.text_m, common.fwb]}>{writerCompanyName}</Text>
            <Text style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
              센터
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              {updatedAt}
            </Text>
          </View>
        ) : (
          <View style={common.row}>
            <Text style={[common.text_m, common.fwb]}>{writerName}</Text>
            <Text style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
              {writerType === 'INSTRUCTOR' ? '강사' : '일반인'}
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              {updatedAt}
            </Text>
          </View>
        )}

        <Text style={[common.mb16, common.text_m]}>{contents}</Text>
        <View style={common.rowCenterBetween}>
          <View style={common.rowCenter}>
            <View style={[common.rowCenter, common.mr10]}>
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
          <View style={[styles.labelBox]}>
            <Text style={[common.text_m]}>{category}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const Tab = createMaterialTopTabNavigator();

const JobOfferTab: React.FC = () => {
  const [bookmarkedRecruits, setBookmarkedRecruits] = useState<any[]>();

  const getBookmarkRecruits = useCallback(() => {
    fetchBookmarkRecruits()
      .then(({data}: any) => {
        setBookmarkedRecruits(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  useEffect(() => {
    getBookmarkRecruits();
  }, [getBookmarkRecruits]);

  const renderItem = ({item}: any) => {
    return <RecruitCarouselItem item={item} />;
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        contentContainerStyle={{marginTop: 16}}
        data={bookmarkedRecruits}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => 'bookmarkedRecruit' + item.seq}
        ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
      />
    </View>
  );
};

const CommunityTab: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const getBookmarkCommunities = useCallback(() => {
    fetchBookmarkCommunities()
      .then(({data}: any) => {
        setBookmarks(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  useEffect(() => {
    getBookmarkCommunities();
  }, [getBookmarkCommunities]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bookmarks.map((bookmark, index) => (
          <BookmarkCommunityListItem
            key={index}
            title={bookmark.community.title}
            writerType={bookmark.community.writerType}
            writerCompanyName={bookmark.community.writerCompanyName}
            writerName={bookmark.community.writerName}
            updatedAt={formatDate(bookmark.community.updatedAt)}
            contents={bookmark.community.contents}
            bookmarkCount={bookmark.community.bookmarkCount}
            commentsLength={bookmark.community.commentsLength}
            category={bookmark.community.category}
            onPress={() =>
              navigation.navigate('CommunityPost', {
                postSeq: bookmark.community.seq,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const BookmarkManageScreen = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="구인공고" component={JobOfferTab} />
      <Tab.Screen name="커뮤니티" component={CommunityTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
    height: '100%',
  },
  listBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  labelBox: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: '#d7e0fd',
    borderRadius: 16,
  },
});

export default BookmarkManageScreen;
