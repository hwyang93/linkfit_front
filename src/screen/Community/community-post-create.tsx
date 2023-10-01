import CTAButton from '@/components/Common/CTAButton';
import { useCreateCommunityPost } from '@/hooks/community/use-create-community-post';
import { useMemberInfo } from '@/hooks/member/use-member-info';
import useInput from '@/hooks/use-input';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import TOAST from '@/lib/constants/toast';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, { KeyboardTypes } from '@components/Input';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { StyleSheet, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const BASE_CHANNEL_SELECT = ['필라테스', '요가'];

const CHANNEL_SELECT = {
  [MEMBER_TYPE.PUBLIC]: BASE_CHANNEL_SELECT,
  [MEMBER_TYPE.INSTRUCTOR]: [...BASE_CHANNEL_SELECT, '강사'],
  [MEMBER_TYPE.COMPANY]: [...BASE_CHANNEL_SELECT, '센터'],
  [MEMBER_TYPE.CENTER]: [...BASE_CHANNEL_SELECT, '센터'],
};

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.COMMUNITY.POST_CREATE>;

export const CommunityPostCreateScreen = ({ navigation }: Props) => {
  const memberInfoQuery = useMemberInfo();
  const userType = memberInfoQuery.data?.status;

  const titleInput = useInput();
  const categoryInput = useInput();
  const contentsInput = useInput();

  const isTitleValid = titleInput.value.length > 0;
  const isCategoryValid = categoryInput.value.length > 0;
  const isContentsValid = contentsInput.value.length > 0;
  const isAllFieldValid = isTitleValid && isCategoryValid && isContentsValid;

  const createCommunityPostMutation = useCreateCommunityPost();

  const onCreateCommunityPost = () => {
    const data = {
      category: categoryInput.value,
      title: titleInput.value,
      contents: contentsInput.value,
    };

    createCommunityPostMutation.mutate(data, {
      onSuccess: () => {
        toast.success({ message: TOAST.COMMUNITY_POST_SUCCESS });
        navigation.navigate('Community');
      },
      onError: (error) => {
        isAxiosError(error) && toast.error({ message: error.message });
      },
    });
  };

  if (!userType) return null;

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
            data={CHANNEL_SELECT[userType]}
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
            loading={createCommunityPostMutation.isLoading}
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
