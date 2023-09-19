import {LoggedInParamList} from '@/../AppInner';
import EmptySet from '@/components/EmptySet';
import {useNoticeListQuery} from '@/hooks/notice/useNoticeListQuery';
import {ROUTE} from '@/navigations/routes';
import {iconPath} from '@/utils/iconPath';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCallback, useEffect, useState} from 'react';
import {FetchCsResponse} from '@/types/api/cs';
import {fetchCs} from '@api/cs';
import {isAxiosError} from 'axios';
import toast from '@hooks/toast';
import {formatDate} from '@util/util';

type Props = NativeStackScreenProps<LoggedInParamList, 'Notice'>;

const NoticeScreen = ({navigation}: Props) => {
  const [cs, setCs] = useState<FetchCsResponse>([]);

  const getCs = useCallback(() => {
    fetchCs({type: 'NOTICE'})
      .then(({data}) => {
        setCs(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, []);

  useEffect(() => {
    getCs();
  }, [getCs]);

  const toNoticeDetail = (noticeId: number) => {
    navigation.navigate(ROUTE.NOTICE_DETAIL, {
      noticeId,
    });
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {cs && cs.length === 0 && <EmptySet text={'등록된 공지사항이 없어요.'} />}
      {cs && (
        <ScrollView>
          {cs.map((item, index) => (
            <Pressable
              key={index}
              style={common.mv16}
              onPress={() => toNoticeDetail(item.seq)}>
              <View style={common.rowCenter}>
                <Image
                  source={iconPath.NOTICE}
                  style={[common.size24, common.mr8]}
                />
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
  container: {flex: 1, padding: 16, paddingTop: 0, backgroundColor: WHITE},
});

export default NoticeScreen;
