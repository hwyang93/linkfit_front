import CommunityUserProfile from '@/components/Community/CommunityUserProfile';
import useModal from '@/hooks/useModal';
import {CommunityEntity} from '@/types/api/entities';
import {iconPath} from '@/utils/iconPath';
import {formatDate} from '@/utils/util';
import {
  createCommunityBookmark,
  createCommunityComment,
  deleteCommunityBookmark,
} from '@api/community';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import Input, {KeyboardTypes} from '@components/Input';
import toast from '@hooks/toast';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import BoxButton from '../Common/BoxButton';

interface CommunityPostTopProps {
  postInfo: CommunityEntity;
  onCommentCreate: () => void;
}

const CommunityPostTop: React.FC<CommunityPostTopProps> = ({
  postInfo,
  onCommentCreate,
}) => {
  const [loading, setLoading] = useState(false);
  const [isBookmark, setIsBookmark] = useState(postInfo.isBookmark);
  const [bookmarkCount, setBookmarkCount] = useState(postInfo.bookmarkCount);
  const [comment, setComment] = useState('');

  const modal = useModal();

  const canGoNext = comment !== '';

  const blockUser = () => {
    Alert.alert('기능 준비중입니다.');
  };

  const reportUser = () => {
    Alert.alert('기능 준비중입니다.');
  };

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
      await createCommunityComment(postInfo.seq, data);
      toast.success({message: '댓글이 작성 되었습니다!'});
      setComment('');
      onCommentCreate();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    } finally {
      setLoading(false);
    }
  }, [postInfo.seq, comment, onCommentCreate]);

  return (
    <View>
      <View>
        <View style={[common.rowCenterBetween, common.mb8]}>
          <Text style={common.title_l}>{postInfo.title}</Text>
          {/* 임시 비활성화 (추후 개발) */}
          {/* <Pressable
            onPress={() => Alert.alert('공유', '공유 버튼을 누르셨어요.')}>
            <Image source={iconPath.SHARE} style={common.size24} />
          </Pressable> */}
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
        <CommunityUserProfile
          name={postInfo.writer.nickname || postInfo.writer.name}
          career={postInfo.writer.career}
          field={postInfo.writer.field}
          profileImage={postInfo.writer.profileImage?.originFileUrl}
          writerType={postInfo.writer.type}
          onKebabPress={modal.open}
        />
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
      {/* TODO: 기능 추가 */}
      <BottomSheet
        title="더보기"
        visible={modal.visible}
        onDismiss={modal.close}>
        <BottomSheetOption label="차단하기" onPress={blockUser} />
        <BottomSheetOption label="신고하기" onPress={reportUser} />
      </BottomSheet>
    </View>
  );
};

export default CommunityPostTop;
