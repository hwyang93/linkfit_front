import { LoggedInParamList } from '@/../AppInner';
import EmptySet from '@/components/EmptySet';
import { useNoticeList } from '@/hooks/notice/use-notice-list';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  {
    id: 1,
    title: '공지사항 제목입니다.',
    date: '2023.01.30',
  },
  {
    id: 2,
    title: '공지사항 클릭하면 어떻게 됨?',
    date: '2023.01.30',
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.NOTICE_LIST>;

export const NoticeListScreen = ({ navigation }: Props) => {
  const { data } = useNoticeList();
  console.log('notice list', data);

  const toNoticeDetail = (noticeId: number) => {
    navigation.navigate(ROUTE.MY.NOTICE_DETAIL, {
      noticeId,
    });
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {DATA && DATA.length === 0 && <EmptySet text={'등록된 공지사항이 없어요.'} />}
      {DATA && (
        <ScrollView>
          {DATA.map((item, index) => (
            <Pressable key={index} style={common.mv16} onPress={() => toNoticeDetail(item.id)}>
              <View style={common.rowCenter}>
                <Image source={iconPath.NOTICE} style={[common.size24, common.mr8]} />
                <Text style={common.title} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <Text style={common.text_m}>{item.date}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: WHITE },
});
