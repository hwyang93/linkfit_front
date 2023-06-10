import {CommunityEntity} from '@/types/api/entities';
import {iconPath} from '@/utils/iconPath';
import {formatDate} from '@/utils/util';
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
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useState} from 'react';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import BoxButton from '../Common/BoxButton';

interface CommunityPostTopProps {
  postInfo: CommunityEntity;
}

const CommunityPostTop: React.FC<CommunityPostTopProps> = ({postInfo}) => {
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
          {formatDate(postInfo.updatedAt)}
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
        <BoxButton
          label="작성"
          loading={loading}
          disabled={!canGoNext}
          onPress={createComment}
        />
      </View>
    </View>
  );
};

export default CommunityPostTop;
