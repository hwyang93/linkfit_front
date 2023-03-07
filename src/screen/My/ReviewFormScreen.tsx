import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import {WHITE} from '@styles/colors';
import Input, {KeyboardTypes} from '@components/Input';
import {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {createReview, updateMemberReputation} from '@api/member';

function ReviewFormScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<LoggedInParamList, 'ReviewForm'>>();
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
        Alert.alert('후기 작성이 완료되었어요!');
        navigation.goBack();
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, [comment, reputationInfo?.seq]);

  const onUpdateReputation = useCallback(() => {
    const data = {comment: comment};
    updateMemberReputation(reputationInfo.seq, data)
      .then(() => {
        Alert.alert('후기 수정이 완료되었어요!');
        navigation.goBack();
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, [comment, reputationInfo?.seq]);

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

      {/* 수정하기 버튼 */}
      <View style={common.mt20}>
        <Pressable disabled={!canGoNext} onPress={onSubmitHandler}>
          <LinearGradient
            style={common.button}
            start={{x: 0.1, y: 0.5}}
            end={{x: 0.6, y: 1}}
            colors={
              canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
            }>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={common.buttonText}>
                {status === 'create' ? '후기 작성하기' : '후기 수정하기'}
              </Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
});

export default ReviewFormScreen;
