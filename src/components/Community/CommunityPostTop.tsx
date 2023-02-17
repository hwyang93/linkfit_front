import {Image, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';

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
          <BookmarkCounter counter={23} />
          <CommentCounter counter={12} />
        </View>
      </View>
    </View>
  );
}

export default CommunityPostTop;
