import CTAButton from '@/components/Common/CTAButton';
import { createInstructorSuggest } from '@api/instructor';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, { KeyboardTypes } from '@components/Input';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

const SUGGESTION = [
  '필라테스 강사님 구합니다.',
  '필라테스 센터 실장님 구해요.',
  '필라테스 파트타임 강사님구해요.',
];

const DEADLINE = ['채용시 마감', '1일 후', '3일 후', '1주 후', '2주 후', '한달 후'];

type Props = NativeStackScreenProps<LoggedInParamList, 'Suggestion'>;

const SuggestionScreen = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recruitSeq, setRecruitSeq] = useState('');
  const [closingDate, setClosingDate] = useState('');

  const canGoNext = title && content && closingDate;

  const onSuggest = useCallback(async () => {
    const data = {
      title: title,
      contents: content,
      recruitSeq: Number(recruitSeq),
      closingDate: closingDate,
      targetMemberSeq: route.params.targetMemberSeq,
    };
    await createInstructorSuggest(data)
      .then(() => {
        toast.success({ message: '포지션 제안이 완료되었어요!' });
        navigation.pop();
      })
      .catch((error) => {
        toast.error({ message: error.message });
      });
  }, [closingDate, content, navigation, recruitSeq, route.params.targetMemberSeq, title]);
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label={'제목'}
            onChangeText={(text: string) => setTitle(text)}
            value={title}
            placeholder={'제목을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'제안 내용'}
            onChangeText={(text: string) => setContent(text)}
            value={content}
            placeholder={'제안 내용을 작성해 주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/* 셀렉트 */}
        <View style={common.mb16}>
          <SelectBox
            label={'구인 공고'}
            data={SUGGESTION}
            onSelect={(value: any) => setRecruitSeq(value)}
            defaultButtonText={'제안할 구인 공고를 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <SelectBox
            label={'마감 기간'}
            data={DEADLINE}
            onSelect={(value: any) => setClosingDate(value)}
            defaultButtonText={'마감 기간을 선택하세요.'}
          />
        </View>
        <View style={common.mt20}>
          <CTAButton
            label="포지션 제안하기"
            loading={loading}
            disabled={!canGoNext}
            onPress={onSuggest}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default SuggestionScreen;
