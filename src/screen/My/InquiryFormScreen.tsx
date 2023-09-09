import {LoggedInParamList} from '@/../AppInner';
import {createInquiry} from '@/api/customer-service';
import CTAButton from '@/components/Common/CTAButton';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, 'InquiryForm'>;

const InquiryFormScreen = ({navigation}: Props) => {
  const [loading, setLoading] = useState(false);
  // const [select, setSelect] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const canGoNext = title && content;

  const onCreateInquiry = useCallback(() => {
    const data = {title: title, contents: content};
    setLoading(true);

    createInquiry(data)
      .then(() => {
        toast.success({message: '1:1 문의를 등록했어요!'});
        navigation.pop();
      })
      .catch(error => {
        toast.error({message: error.message});
      })
      .finally(() => {
        setLoading(false);
      });
  }, [content, title, navigation]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <DismissKeyboardView>
        {/*<View style={common.mv16}>*/}
        {/*  <SelectBox*/}
        {/*    label={'문의'}*/}
        {/*    data={DATA}*/}
        {/*    onSelect={(value: any) => setSelect(value)}*/}
        {/*    defaultButtonText={'문의할 항목을 선택하세요'}*/}
        {/*  />*/}
        {/*</View>*/}
        {/* 제목 */}
        <View style={common.mv16}>
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
        <View style={common.mt40}>
          <CTAButton
            label="1:1 문의 하기"
            loading={loading}
            disabled={!canGoNext}
            onPress={onCreateInquiry}
          />
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
});
export default InquiryFormScreen;
