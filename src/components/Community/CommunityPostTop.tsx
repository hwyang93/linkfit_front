import {Alert, Image, Pressable, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';

function CommunityPostTop() {
  const USER = {
    id: 1,
    image: iconPath.THUMBNAIL,
    nickname: '이런이름',
    certified: true,
    field: '필라테스',
    career: '경력',
  };

  return (
    <View>
      <View>
        <View style={[common.rowCenterBetween, common.mb8]}>
          <Text style={common.title_l}>게시글 제목</Text>
          <Image source={iconPath.SHARE} style={common.size24} />
        </View>
        <Text style={common.text_s}>2012.12.12</Text>
      </View>

      <View style={[common.mv16, common.row]}>
        <View style={common.channelBox}>
          <Text style={common.channelText}>채널명</Text>
        </View>
      </View>

      <View>
        <CommunityUserComponent data={USER} />
      </View>

      <View style={common.mv16}>
        <Text style={common.text_m}>
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
          내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
          내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
          내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
          내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글
          내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
          게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.
        </Text>
      </View>

      <View style={common.mb16}>
        <View style={common.rowCenter}>
          <View style={[common.rowCenter, common.mr8]}>
            <Pressable onPress={() => Alert.alert('test', 'test')}>
              <Image source={iconPath.BOOKMARK} style={common.size24} />
            </Pressable>
            <Text style={[common.text_m, common.fwb]}>23</Text>
          </View>
          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('test', 'test')}>
              <Image source={iconPath.COMMENT} style={common.size24} />
            </Pressable>
            <Text style={[common.text_m, common.fwb]}>23</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CommunityPostTop;
