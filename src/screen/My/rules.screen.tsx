import { LoggedInParamList } from '@/../AppInner';
import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { StyleSheet, Text, View } from 'react-native';

// TODO: 스크린 이름 매치 필요 (Rule -> Rules)
type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.RULES>;

export const RulesScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={common.text_m}>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: WHITE },
});
