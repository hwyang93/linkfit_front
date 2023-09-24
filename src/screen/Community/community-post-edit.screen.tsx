import CTAButton from '@/components/Common/CTAButton';
import TextField from '@/components/Common/TextField';
import SelectBox from '@/components/SelectBox';
import { useCommunityPostQuery } from '@/hooks/community/use-community-post-query';
import { useUpdateCommunityPost } from '@/hooks/community/use-update-community-post';
import useInput from '@/hooks/use-input';
import THEME from '@/styles/theme';
import { ROUTE } from '@/utils/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.COMMUNITY.POST_EDIT>;

// TODO: 유저 유형에 따라 채널 선택지를 다르게 보여주도록 수정
export const CommunityPostEditScreen = ({ navigation, route }: Props) => {
  const [channelSelectValue, setChannelSelectValue] = useState('');

  const communityPostQuery = useCommunityPostQuery(route.params.postId);
  const communityPostUpdateMutation = useUpdateCommunityPost();

  const titleInput = useInput(communityPostQuery.data?.title);
  const contentInput = useInput(communityPostQuery.data?.contents);

  const submitButtonDisabled = !titleInput.value || !contentInput.value || !channelSelectValue;

  const onSubmit = () => {
    const body = {
      title: titleInput.value,
      content: contentInput.value,
    };

    communityPostUpdateMutation.mutate(
      { postId: route.params.postId, body: body },
      { onSuccess: navigation.goBack },
    );
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: THEME.WHITE }}>
      <TextField label="글 제목" value={titleInput.value} onChangeText={titleInput.onChange} />
      <View style={{ marginTop: 16 }}>
        <SelectBox
          label="채널"
          data={['필라테스', '요가', '강사', '센터']}
          onSelect={(value: string) => setChannelSelectValue(value)}
          defaultButtonText="채널을 선택하세요"
        />
      </View>
      <TextField
        height={284}
        multiline
        style={{ marginTop: 16 }}
        value={contentInput.value}
        onChangeText={contentInput.onChange}
      />
      <CTAButton
        style={{ marginTop: 32 }}
        label="게시글 등록"
        disabled={submitButtonDisabled}
        onPress={onSubmit}
      />
    </View>
  );
};
