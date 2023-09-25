import { LoggedInParamList } from '@/../AppInner';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import EmptySet from '@components/EmptySet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  {
    id: 1,
    icon: iconPath.BELL,
    value: '알림 내용입니다. 알림 내용입니다. 알림 내용입니다.',
    date: '2023.01.30',
  },
  {
    id: 2,
    icon: iconPath.BELL,
    value: '알림 내용입니다. 알림 내용입니다. 알림 내용입니다.',
    date: '2023.01.30',
  },
  {
    id: 1,
    icon: iconPath.BELL,
    value: '널 만나고서부터 되는 일이 하나도 없어.',
    date: '2023.01.30',
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.NOTIFICATION>;

export const MyNotificationScreen = ({}: Props) => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {DATA.length > 0 ? (
        <ScrollView>
          {DATA.map((item, index) => {
            return (
              <View key={index} style={common.mv16}>
                <View style={[common.rowCenter]}>
                  <Image source={item.icon} style={[common.size24, common.mr8]} />
                  <Text style={[common.text_m, { flex: 1 }]} numberOfLines={1}>
                    {item.value}
                  </Text>
                </View>
                <Text style={common.text_m}>{item.date}</Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySet text={'등록된 알림이 없어요.'} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
