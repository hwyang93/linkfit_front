import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import EmptySet from '@components/EmptySet';
import {iconPath} from '@util/iconPath';
import {SafeAreaView} from 'react-native-safe-area-context';
import common from '@styles/common';

function MyNotificationScreen() {
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
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {DATA.length > 0 ? (
        <ScrollView>
          {DATA.map((item, index) => {
            return (
              <View key={index} style={common.mv16}>
                <View style={[common.rowCenter]}>
                  <Image
                    source={item.icon}
                    style={[common.size24, common.mr8]}
                  />
                  <Text style={[common.text_m, {flex: 1}]} numberOfLines={1}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MyNotificationScreen;
