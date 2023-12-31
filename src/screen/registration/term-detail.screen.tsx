import IconButton from '@/components/Common/IconButton';
import Header from '@/components/Header/Header';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { AuthStackParamList } from '@/navigations/auth-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_TITLE = {
  service: '서비스 이용약관',
  privacy: '개인정보 처리방침',
} as const;

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTE.TERM.DETAIL>;

export const TermDetailScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={HEADER_TITLE[route.params.type]}
        rightContent={<IconButton source={iconPath.CLOSE} onPress={navigation.goBack} />}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '700' }}>제 1조 목적</Text>
      </View>
    </SafeAreaView>
  );
};
