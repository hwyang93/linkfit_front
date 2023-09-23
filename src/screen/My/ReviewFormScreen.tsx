import CTAButton from '@/components/Common/CTAButton';
import { createReview, updateMemberReputation } from '@api/member';
import Input, { KeyboardTypes } from '@components/Input';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'ReviewForm'>;

const ReviewFormScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false);
  const [reputationInfo] = useState<any>(route.params.reputationInfo);
  const [comment, setComment] = useState(reputationInfo?.comment);
  const [status, setStatus] = useState('');

  const onCreateReputation = useCallback(() => {
    const data = {
      recruitSeq: reputationInfo.recruitSeq,
      comment: comment,
      evaluationMemberSeq: reputationInfo.evaluationMemberSeq,
      targetMemberSeq: reputationInfo.targetMemberSeq,
    };
    createReview(data)
      .then(() => {
        setLoading(true);
        toast.success({ message: '후기 작성이 완료되었어요!' });
        navigation.goBack();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error({ message: error.message });
      });
  }, [
    comment,
    reputationInfo.evaluationMemberSeq,
    reputationInfo.recruitSeq,
    reputationInfo.targetMemberSeq,
    navigation,
  ]);

  const onUpdateReputation = useCallback(() => {
    const data = { comment: comment };
    updateMemberReputation(reputationInfo.seq, data)
      .then(() => {
        setLoading(true);
        toast.success({ message: '후기 수정이 완료되었어요!' });
        navigation.goBack();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error({ message: error.message });
      });
  }, [comment, reputationInfo?.seq, navigation]);

  const onSubmitHandler = useCallback(() => {
    if (status === 'create') {
      onCreateReputation();
    } else if (status === 'update') {
      onUpdateReputation();
    }
  }, [onCreateReputation, onUpdateReputation, status]);

  useEffect(() => {
    if (reputationInfo.seq) {
      setStatus('update');
    } else {
      setStatus('create');
    }
  }, [reputationInfo]);

  const canGoNext = comment;
  return (
    <View style={styles.container}>
      <View style={common.mb16}>
        <Input
          label={'후기 내용'}
          onChangeText={(text: string) => setComment(text)}
          value={comment}
          placeholder={'후기 내용을 작성해 주세요.'}
          keyboardType={KeyboardTypes.DEFAULT}
          editable={true}
          multiline={true}
        />
      </View>
      <View style={common.mt20}>
        <CTAButton
          label={status === 'create' ? '후기 작성하기' : '후기 수정하기'}
          loading={loading}
          disabled={!canGoNext}
          onPress={onSubmitHandler}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: WHITE },
});

export default ReviewFormScreen;
