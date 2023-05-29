import {createCommunityPost} from '@api/community';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import SelectBox from '@components/SelectBox';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LoggedInParamList} from '../../../AppInner';

const LOADING = false;

const CHANNEL = ['필라테스', '요가', '릴리리맘보'];
type Props = NativeStackScreenProps<LoggedInParamList, 'CommunityPostForm'>;

const CommunityPostFormScreen = ({navigation}: Props) => {
  // TODO: 로딩 상태 처리
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [contents, setContents] = useState('');
  const canGoNext = title && contents && category;

  const onCreateCommunityPost = useCallback(() => {
    const data = {category: category, title: title, contents: contents};

    createCommunityPost(data)
      .then(() => {
        toast.success({message: '게시글 등록이 완료되었어요!'});
        navigation.navigate('Community');
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [category, contents, navigation, title]);

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Input
            label={'제목'}
            onChangeText={(text: string) => setTitle(text)}
            value={title}
            placeholder={'게시글 제목을 입력하세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
          />
        </View>

        <View style={common.mb16}>
          <SelectBox
            label={'채널'}
            data={CHANNEL}
            onSelect={(value: any) => setCategory(value)}
            defaultButtonText={'채널을 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'게시글 내용'}
            onChangeText={(text: string) => setContents(text)}
            value={contents}
            placeholder={'게시글 내용을 작성해 주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/* 게시글 등록 버튼 */}
        <View style={common.mt20}>
          <Pressable disabled={!canGoNext} onPress={onCreateCommunityPost}>
            <LinearGradient
              style={common.button}
              start={{x: 0.1, y: 0.5}}
              end={{x: 0.6, y: 1}}
              colors={
                canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
              }>
              {LOADING ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={common.buttonText}>게시글 등록</Text>
              )}
            </LinearGradient>
          </Pressable>
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
