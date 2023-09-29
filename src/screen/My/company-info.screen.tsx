import { LoggedInParamList } from '@/../AppInner';
import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.COMPANY_INFO>;

export const CompanyInfoScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={common.text_m}>test</Text>
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
