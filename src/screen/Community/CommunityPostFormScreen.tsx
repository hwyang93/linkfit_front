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
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import SelectBox from '@components/SelectBox';
import LinearGradient from 'react-native-linear-gradient';

function CommunityPostFormScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [content, setContent] = useState('');

  const CHANNEL = ['필라테스', '요가', '릴리리맘보'];

  const canGoNext = title && content && channel;

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
            onSelect={(value: any) => setChannel(value)}
            defaultButtonText={'채널을 선택하세요.'}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'게시글 내용'}
            onChangeText={(text: string) => setContent(text)}
            value={content}
            placeholder={'게시글 내용을 작성해 주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/* 게시글 등록 버튼 */}
        <View style={common.mt20}>
          <Pressable disabled={!canGoNext} onPress={() => {}}>
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
                <Text style={common.buttonText}>게시글 등록</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default CommunityPostFormScreen;
