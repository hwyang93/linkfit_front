import IconButton from '@/components/Common/IconButton';
import Header from '@/components/Header/Header';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { AuthStackParamList } from '@/navigations/auth-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER = {
  privacy: '개인정보 수집 및 이용',
  service: '서비스 이용약관',
} as const;

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTE.AUTH.TERM_DETAIL>;

export const TermDetailScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={HEADER[route.params.type]}
        rightContent={<IconButton source={iconPath.CLOSE} onPress={navigation.goBack} />}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '700' }}>제 1조 목적</Text>
      </View>
    </SafeAreaView>
  );
};
