import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

function LinkAddScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const canGoNext = url && title;
  return (
    <View style={styles.container}>
      <View style={common.mb16}>
        <Input
          label={'URL'}
          onChangeText={(text: string) => setUrl(text.trim())}
          value={url}
          placeholder={'https://example.com'}
          keyboardType={KeyboardTypes.DEFAULT}
        />
      </View>

      <View>
        <Input
          label={'URL'}
          onChangeText={(text: string) => setTitle(text)}
          value={title}
          placeholder={'링크 제목을 입력하세요.'}
          keyboardType={KeyboardTypes.DEFAULT}
        />
      </View>

      {/* 완료 버튼 */}
      <View style={common.mt40}>
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
              <Text style={common.buttonText}>완료</Text>
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
    padding: 16,
    backgroundColor: WHITE,
  },
});
export default LinkAddScreen;
