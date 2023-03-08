import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import common from '@styles/common';
import SelectBox from '@components/SelectBox';
import {useState} from 'react';
import Input, {KeyboardTypes} from '@components/Input';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

function InquiryFormScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [select, setSelect] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState('');
  const DATA = [''];

  const canGoNext = select && title && content;
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <DismissKeyboardView>
        <View style={common.mv16}>
          <SelectBox
            label={'문의'}
            data={DATA}
            onSelect={(value: any) => setSelect(value)}
            defaultButtonText={'문의할 항목을 선택하세요'}
          />
        </View>
        {/* 제목 */}
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
        {/* 문의 내용 */}
        <View style={common.mb16}>
          <Input
            label={'문의 내용'}
            onChangeText={(text: string) => setContent(text)}
            value={content}
            placeholder={'문의 내용을 작성해주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/* 문의 내용 등록 버튼 */}
        <View style={common.mt40}>
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
                <Text style={common.buttonText}>1:1 문의 하기</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
});
export default InquiryFormScreen;
