import { LoggedInParamList } from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import { useCreateCsInquiry } from '@/hooks/customer-service/use-create-cs-inquiry';
import { ROUTE } from '@/utils/constants/route';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, { KeyboardTypes } from '@components/Input';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.INQUIRY_FORM>;

export const InquiryFormScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const canGoNext = title && content;

  const createCsInquiryMutation = useCreateCsInquiry();

  const data = { title: title, contents: content };

  const onCreateInquiry = () => {
    createCsInquiryMutation.mutate(data, {
      onSuccess: () => {
        toast.success({ message: '1:1 문의를 등록했어요!' });
        navigation.pop();
      },
      onError: (error) => {
        isAxiosError(error) && toast.error({ message: error.message });
      },
    });
  };

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
            loading={createCsInquiryMutation.isLoading}
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
