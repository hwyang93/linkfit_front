import {LoggedInParamList} from '@/../AppInner';
import {iconPath} from '@/utils/iconPath';
import EmptySet from '@components/EmptySet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DATA = [
  {
    title: '공지사항 제목입니다.',
    date: '2023.01.30',
  },
  {
    title: '공지사항 클릭하면 어떻게 됨?',
    date: '2023.01.30',
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, 'Notice'>;

const NoticeScreen = ({}: Props) => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {DATA.length > 0 ? (
        <ScrollView>
          {DATA.map((item, index) => {
            return (
              <View key={index} style={common.mv16}>
                <View style={common.rowCenter}>
                  <Image
                    source={iconPath.NOTICE}
                    style={[common.size24, common.mr8]}
                  />
                  <Text style={common.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
                <Text style={common.text_m}>{item.date}</Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySet text={'등록된 공지사항이 없어요.'} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 0, backgroundColor: WHITE},
});

export default NoticeScreen;
