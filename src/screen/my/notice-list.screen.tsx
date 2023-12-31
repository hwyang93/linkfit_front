import { LoggedInParamList } from '@/../AppInner';
import EmptySet from '@/components/EmptySet';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import { FetchCsResponse } from '@/types/api/cs.type';
import { fetchCs } from '@api/cs';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.NOTICE_LIST>;

export const NoticeListScreen = ({ navigation }: Props) => {
  const [cs, setCs] = useState<FetchCsResponse>([]);

  const getCs = useCallback(() => {
    fetchCs({ type: 'NOTICE' })
      .then(({ data }) => {
        setCs(data);
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast.error({ message: error.message });
        }
      });
  }, []);

  useEffect(() => {
    getCs();
  }, [getCs]);

  const toNoticeDetail = (noticeId: number) => {
    navigation.navigate(ROUTE.MY.NOTICE_DETAIL, {
      noticeId,
    });
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {cs && cs.length === 0 && <EmptySet text={'등록된 공지사항이 없어요.'} />}
      {cs && (
        <ScrollView>
          {cs.map((item, index) => (
            <Pressable key={index} style={common.mv16} onPress={() => toNoticeDetail(item.seq)}>
              <View style={common.rowCenter}>
                <Image source={iconPath.NOTICE} style={[common.size24, common.mr8]} />
                <Text style={common.title} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <Text style={common.text_m}>{formatDate(item.updatedAt)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: WHITE, flex: 1, padding: 16, paddingTop: 0 },
});
