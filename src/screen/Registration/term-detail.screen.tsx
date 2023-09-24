import IconButton from '@/components/Common/IconButton';
import Header from '@/components/Header/Header';
import { AuthStackParamList } from '@/navigations/AuthStack';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTE.AUTH.TERM_DETAIL>;

export const TermDetailScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="개인정보 수집 및 이용동의"
        rightContent={<IconButton source={iconPath.CLOSE} onPress={navigation.goBack} />}
      />
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '700' }}>제 1조 목적</Text>
      </View>
    </SafeAreaView>
  );
};
