import { useCreateReview } from '@/hooks/review/use-create-review';
import { useReview } from '@/hooks/review/use-review';
import { useUpdateReview } from '@/hooks/review/use-update-review';
import { useAppNavigation } from '@/hooks/use-app-navigation';
import useInput from '@/hooks/use-input';
import { ROUTE } from '@/lib/constants/route';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import { StyleSheet, View } from 'react-native';
import CTAButton from '../Common/CTAButton';
import Input, { KeyboardTypes } from '../Input';

interface ReviewFormProps {
  mode: 'create' | 'update';
  reviewId?: number;
  targetMemberId?: number;
  recruitId?: number;
  evalutationMemberId?: number;
}

export const ReviewForm = ({
  mode,
  reviewId,
  targetMemberId,
  recruitId,
  evalutationMemberId,
}: ReviewFormProps) => {
  const reviewQuery = useReview(reviewId);

  const commentInput = useInput(reviewQuery.data?.comment || '');

  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();

  const navigation = useAppNavigation();

  const createFormValid = commentInput.value.length > 0;

  const updateFormValid =
    commentInput.value.length > 0 && commentInput.value !== reviewQuery.data?.comment;

  const onCreate = () => {
    if (!evalutationMemberId || !recruitId || !targetMemberId) return;

    createReviewMutation.mutate(
      {
        comment: commentInput.value,
        evaluationMemberSeq: evalutationMemberId,
        recruitSeq: recruitId,
        targetMemberSeq: targetMemberId,
      },
      {
        onSuccess: () => {
          // TODO: 기능 추가
          console.log('success!');
        },
      },
    );
  };

  const onUpdate = () => {
    if (!reviewId) return;

    updateReviewMutation.mutate(
      {
        reviewId: reviewId,
        body: {
          comment: commentInput.value,
        },
      },
      {
        onSuccess: () => {
          navigation.navigate(ROUTE.MY.REVIEW_MANAGE);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={common.mb16}>
        <Input
          label="후기 내용"
          placeholder="후기 내용을 작성해 주세요."
          value={commentInput.value}
          onChangeText={commentInput.onChange}
          keyboardType={KeyboardTypes.DEFAULT}
          editable
          multiline
        />
      </View>
      <View style={common.mt20}>
        {mode === 'create' && (
          <CTAButton
            label="후기 작성하기"
            loading={createReviewMutation.isLoading}
            disabled={!createFormValid}
            onPress={onCreate}
          />
        )}
        {mode === 'update' && (
          <CTAButton
            label="후기 수정하기"
            loading={updateReviewMutation.isLoading}
            disabled={!updateFormValid}
            onPress={onUpdate}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: THEME.WHITE, flex: 1, padding: 16 },
});
