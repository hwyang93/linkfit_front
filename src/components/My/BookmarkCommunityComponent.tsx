import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {GRAY} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import {useCallback, useEffect, useState} from 'react';
import {fetchBookmarkCommunities} from '@api/community';

function BookmarkCommunityComponent() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const getBookmarkCommunities = useCallback(() => {
    fetchBookmarkCommunities()
      .then(({data}: any) => {
        setBookmarks(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  useEffect(() => {
    getBookmarkCommunities();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {bookmarks.map((bookmark, index) => {
        const communityInfo = bookmark.community;
        return (
          <View key={index} style={styles.listBox}>
            <Text style={[common.title, common.fs18, common.mb8]}>
              {communityInfo.title}
            </Text>
            {communityInfo.writer.type === 'COMPANY' ? (
              <View style={common.row}>
                <Text style={[common.text_m, common.fwb]}>
                  {communityInfo.writer.company.companyName}
                </Text>
                <Text
                  style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
                  센터
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                  {communityInfo.updatedAt}
                </Text>
              </View>
            ) : (
              <View style={common.row}>
                <Text style={[common.text_m, common.fwb]}>
                  {communityInfo.writer.name}
                </Text>
                <Text
                  style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
                  {communityInfo.writer.type === 'INSTRUCTOR'
                    ? '강사'
                    : '일반인'}
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                  {communityInfo.updatedAt}
                </Text>
              </View>
            )}

            <Text style={[common.mb16, common.text_m]}>
              {communityInfo.contents}
            </Text>
            <View style={common.rowCenterBetween}>
              <View style={common.rowCenter}>
                <View style={[common.rowCenter, common.mr10]}>
                  <Image source={iconPath.BOOKMARK_ON} style={common.size24} />
                  <Text style={[common.text_m, common.fwb]}>23</Text>
                </View>
                <View style={common.rowCenter}>
                  <Image source={iconPath.COMMENT} style={common.size24} />
                  <Text style={[common.text_m, common.fwb]}>23</Text>
                </View>
              </View>
              <View style={[styles.labelBox]}>
                <Text style={[common.text_m]}>{communityInfo.category}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

export default BookmarkCommunityComponent;
