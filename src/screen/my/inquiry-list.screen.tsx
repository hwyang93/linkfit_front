import FloatingActionButton from '@/components/Common/FloatingActionButton';
import EmptySet from '@/components/EmptySet';
import { useCsInquiryList } from '@/hooks/customer-service/use-cs-inquiry-list';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import THEME from '@/styles/theme';
import FABContainer from '@components/Common/FABContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.INQUIRY_LIST>;

export const InquiryListScreen = ({ navigation }: Props) => {
  const { data } = useCsInquiryList();
  const inquiries = data;

  const toInquiry = () => {
    navigation.navigate(ROUTE.MY.INQUIRY_FORM);
  };

  const toInquiryDetail = (inquiryId: number) => {
    navigation.navigate(ROUTE.MY.INQUIRY_DETAIL, { inquiryId });
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView>
        {inquiries?.length === 0 && <EmptySet text="등록된 문의 내역이 없어요." />}
        {inquiries?.map((item, index) => (
          <Pressable key={index} style={common.mv16} onPress={() => toInquiryDetail(item.seq)}>
            <View style={common.rowCenterBetween}>
              <View style={[common.rowCenter, { width: '70%' }]}>
                <Image source={iconPath.INQUIRY} style={[common.size24, common.mr8]} />
                <Text style={common.title} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBox,
                  item.status === 'COMPLETE' && { borderColor: THEME.PRIMARY },
                ]}>
                {item.status === 'COMPLETE' ? (
                  <Text style={{ fontSize: 10, color: THEME.PRIMARY }}>답변완료</Text>
                ) : (
                  <Text style={{ fontSize: 10, color: THEME.GREY02 }}>답변대기</Text>
                )}
              </View>
            </View>
            <Text style={common.text_m}>{formatDate(item.createdAt)}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <FABContainer>
        <FloatingActionButton label="문의하기" onPress={toInquiry} />
      </FABContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: WHITE, flex: 1, padding: 16 },
  statusBox: {
    borderColor: GRAY.LIGHT,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
