import {Image, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';

function CommunityPostTop({postInfo}: any) {
  return (
    <View>
      <View>
        <View style={[common.rowCenterBetween, common.mb8]}>
          <Text style={common.title_l}>{postInfo.title}</Text>
          <Image source={iconPath.SHARE} style={common.size24} />
        </View>
        <Text style={common.text_s}>{postInfo.updatedAt}</Text>
      </View>

      <View style={[common.mv16, common.row]}>
        <View style={common.channelBox}>
          <Text style={common.channelText}>{postInfo.category}</Text>
        </View>
      </View>

      <View>
        <CommunityUserComponent writerInfo={postInfo.writer} />
      </View>

      <View style={common.mv16}>
        <Text style={common.text_m}>{postInfo.contents}</Text>
      </View>

      <View style={common.mb16}>
        <View style={common.rowCenter}>
          <BookmarkCounter counter={postInfo.bookmarks?.length} />
          <CommentCounter counter={postInfo.comments?.length} />
        </View>
      </View>
    </View>
  );
}

export default CommunityPostTop;
