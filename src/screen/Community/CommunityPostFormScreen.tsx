import CTAButton from '@/components/Common/CTAButton';
import useInput from '@/hooks/useInput';
import TOAST from '@/utils/constants/toast';
import {createCommunityPost} from '@api/community';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

const LOADING = false;
const CHANNEL = ['필라테스', '요가', '릴리리맘보'];

type Props = NativeStackScreenProps<LoggedInParamList, 'CommunityPostForm'>;

const CommunityPostFormScreen = ({navigation}: Props) => {
  const titleInput = useInput();
  const categoryInput = useInput();
  const contentsInput = useInput();

  const isTitleValid = titleInput.value.length > 0;
  const isCategoryValid = categoryInput.value.length > 0;
  const isContentsValid = contentsInput.value.length > 0;
  const isAllFieldValid = isTitleValid && isCategoryValid && isContentsValid;

  const onCreateCommunityPost = useCallback(() => {
    const data = {
      category: categoryInput.value,
      title: titleInput.value,
      contents: contentsInput.value,
    };

    createCommunityPost(data)
      .then(() => {
        toast.success({message: TOAST.COMMUNITY_POST_SUCCESS});
        navigation.navigate('Community');
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [categoryInput.value, contentsInput.value, navigation, titleInput.value]);

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label="제목"
            onChangeText={titleInput.onChange}
            value={titleInput.value}
            placeholder="게시글 제목을 입력하세요."
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
          />
        </View>

        <View style={common.mb16}>
          <SelectBox
            label="채널"
            data={CHANNEL}
            onSelect={categoryInput.onChange}
            defaultButtonText="채널을 선택하세요."
          />
        </View>

        <View style={common.mb16}>
          <Input
            label="게시글 내용"
            onChangeText={contentsInput.onChange}
            value={contentsInput.value}
            placeholder="게시글 내용을 작성해 주세요."
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>
        <View style={common.mt20}>
          <CTAButton
            label="게시글 등록"
            loading={LOADING}
            disabled={!isAllFieldValid}
            onPress={onCreateCommunityPost}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default CommunityPostFormScreen;
