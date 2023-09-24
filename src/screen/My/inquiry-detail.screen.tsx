import AppScrollView from '@/components/\bLayout/AppScrollView';
import Icon from '@/components/Common/Icon';
import { useCsInquiry } from '@/hooks/customer-service/use-cs-inquiry';
import THEME from '@/styles/theme';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import { formatDate } from '@/utils/util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.INQUIRY_DETAIL>;

export const InquiryDetailScreen = ({ route }: Props) => {
  const { data } = useCsInquiry(route.params.inquiryId);

  return (
    <>
      {data && (
        <AppScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            <View>
              <Text style={{ marginTop: 16, fontSize: 24, fontWeight: '700' }}>
                <Icon source={iconPath.INQUIRY} />
                {'  '}
                {data.title}
              </Text>
              <Text style={{ marginTop: 4, color: THEME.GREY02 }}>
                {formatDate(data.updatedAt)}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0.5,
              }}>
              {data.contents}
            </Text>
            {/* TODO: API 연동 */}
            {data.answers && (
              <>
                <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '700' }}>
                  RE: 답변 제목입니다.
                </Text>
                <Text style={{ marginTop: 8, fontSize: 16, lineHeight: 24 }}>
                  답변 내용입니다. 답변 내용입니다. 답변 내용입니다. 답변 내용입니다.
                </Text>
              </>
            )}
          </View>
        </AppScrollView>
      )}
    </>
  );
};
