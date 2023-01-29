import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import Input, {KeyboardTypes, ReturnKeyTypes} from '@components/Input';
import {useState} from 'react';
import SelectBox from '@components/SelectBox';
import LinearGradient from 'react-native-linear-gradient';

function SuggestionScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [suggestionType, setSuggestionType] = useState('');
  const [deadline, setDeadline] = useState('');

  const SUGGESTION = [
    '필라테스 강사님 구합니다.',
    '필라테스 센터 실장님 구해요.',
    '필라테스 파트타임 강사님구해요.',
  ];
  const DEADLINE = [
    '채용시 마감',
    '1일 후',
    '3일 후',
    '1주 후',
    '2주 후',
    '한달 후',
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const canGoNext = false;

  return (
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
          data={SUGGESTION}
          onSelect={(value: any) => setSuggestionType(value)}
          defaultButtonText={'제안할 구인 공고를 선택하세요.'}
        />
      </View>

      <View style={common.mb16}>
        <SelectBox
          data={DEADLINE}
          onSelect={(value: any) => setDeadline(value)}
          defaultButtonText={'마감 기간을 선택하세요.'}
        />
      </View>

      {/* 제안하기 버튼 */}
      <View style={common.mt20}>
        <Pressable onPress={() => {}}>
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
              <Text style={common.buttonText}>본인인증</Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default SuggestionScreen;
