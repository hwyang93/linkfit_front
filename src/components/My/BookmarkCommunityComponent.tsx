import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {GRAY} from '@styles/colors';
import {iconPath} from '@util/iconPath';

function BookmarkCommunityComponent() {
  return (
    <ScrollView>
      <View style={styles.listBox}>
        <Text style={[common.title, common.fs18, common.mb8]}>게시글 제목</Text>
        <View style={common.row}>
          <Text style={[common.text_m, common.fwb]}>센터 명</Text>
          <Text style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
            센터
          </Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>2022.12.12</Text>
        </View>
        <Text style={[common.mb16, common.text_m]}>
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
          내용입니다.
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
            <Text style={[common.text_m]}>채널명</Text>
          </View>
        </View>
      </View>
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
