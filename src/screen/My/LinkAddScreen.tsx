import {LoggedInParamList} from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import Input, {KeyboardTypes} from '@components/Input';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, 'LinkAdd'>;

const LinkAddScreen = ({}: Props) => {
  const [loading, setLoading] = useState(false);
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
      <View style={common.mt40}>
        <CTAButton label="완료" loading={loading} disabled={!canGoNext} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});
export default LinkAddScreen;
