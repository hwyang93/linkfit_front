import {CommunityEntity} from '@/types/api/entities';
import {iconPath} from '@/utils/iconPath';
import {dateFormatter} from '@/utils/util';
import {
  createCommunityBookmark,
  createCommunityComment,
  deleteCommunityBookmark,
} from '@api/community';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import Input, {KeyboardTypes} from '@components/Input';
import toast from '@hooks/toast';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CommunityPostTopProps {
  postInfo: CommunityEntity;
}

const CommunityPostTop = ({postInfo}: CommunityPostTopProps) => {
  const [loading, setLoading] = useState(false);
  const [isBookmark, setIsBookmark] = useState(postInfo.isBookmark);
  const [bookmarkCount, setBookmarkCount] = useState(postInfo.bookmarkCount);
  const [comment, setComment] = useState('');

  const canGoNext = comment !== '';

  const onClickBookmark = useCallback(() => {
    if (isBookmark === 'N') {
      createCommunityBookmark(postInfo.seq)
        .then(() => {
          toast.success({message: '북마크 등록이 완료되었어요!'});
          setIsBookmark('Y');
          setBookmarkCount(prev => prev + 1);
        })
        .catch(error => {
          toast.error({message: error.message});
        });
    } else {
      deleteCommunityBookmark(postInfo.seq)
        .then(() => {
          toast.success({message: '북마크가 삭제되었어요!'});
          setIsBookmark('N');
          setBookmarkCount(prev => prev - 1);
        })
        .catch(error => {
          toast.error({message: error.message});
        });
    }
  }, [isBookmark, postInfo.seq]);

  const createComment = useCallback(async () => {
    const data = {
      contents: comment,
    };

    try {
      setLoading(true);
      createCommunityComment(postInfo.seq, data);
      toast.success({message: '댓글이 작성 되었습니다!'});
      setComment('');
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    } finally {
      setLoading(false);
    }
  }, [postInfo.seq, comment]);

  return (
    <View>
      <View>
        <View style={[common.rowCenterBetween, common.mb8]}>
          <Text style={common.title_l}>{postInfo.title}</Text>
          <Pressable
            onPress={() => Alert.alert('공유', '공유 버튼을 누르셨어요.')}>
            <Image source={iconPath.SHARE} style={common.size24} />
          </Pressable>
        </View>
        <Text style={[common.text_s, common.fcg]}>
          {dateFormatter(postInfo.updatedAt, 'YYYY.MM.DD')}
        </Text>
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
          <BookmarkCounter
            seq={postInfo.seq}
            isBookmark={isBookmark}
            counter={bookmarkCount}
            onClick={onClickBookmark}
          />
          <CommentCounter counter={postInfo.comments?.length} />
        </View>
      </View>

      {/* 댓글 입력 */}
      <View style={[common.mb16, common.rowCenter]}>
        <View>
          <Image source={iconPath.THUMBNAIL} style={common.size32} />
        </View>
        <View style={[{flex: 1, marginHorizontal: 6}]}>
          <Input
            onChangeText={(text: string) => setComment(text)}
            value={comment}
            placeholder={'댓글을 입력하세요.'}
            comment={true}
            keyboardType={KeyboardTypes.DEFAULT}
          />
        </View>

        <Pressable style={[{flex: 0}]} onPress={createComment}>
          <LinearGradient
            style={[common.button, {height: 40}]}
            start={{x: 0.1, y: 0.5}}
            end={{x: 0.6, y: 1}}
            colors={
              canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
            }>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[common.text_s, styles.confirm]}>작성</Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirm: {
    fontWeight: '700',
    color: WHITE,
  },
});

export default CommunityPostTop;
