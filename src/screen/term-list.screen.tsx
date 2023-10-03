import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.TERM.LIST>;

export const TermListScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate(ROUTE.TERM.DETAIL, { type: 'service' })}>
        <Text>서비스 이용약관</Text>
      </Pressable>
      <Pressable
        style={{ marginTop: 32 }}
        onPress={() => navigation.navigate(ROUTE.TERM.DETAIL, { type: 'privacy' })}>
        <Text>개인정보 처리방침</Text>
      </Pressable>
    </View>
  );
};
