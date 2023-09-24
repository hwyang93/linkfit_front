import AppScrollView from '@/components/\bLayout/AppScrollView';
import Icon from '@/components/Common/Icon';
import { useNotice } from '@/hooks/notice/use-notice';
import { ROUTE } from '@/navigations/routes';
import THEME from '@/styles/theme';
import { iconPath } from '@/utils/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.NOTICE_DETAIL>;

const NoticeDetailScreen = ({ route }: Props) => {
  const { data } = useNotice(route.params.noticeId);
  console.log('notice detail', data);

  return (
    <>
      {true && (
        <AppScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            <View>
              <Text style={{ marginTop: 16, fontSize: 24, fontWeight: '700' }}>
                <Icon source={iconPath.NOTICE} />
                {'  '}
                공지사항 제목입니다.
              </Text>
              <Text style={{ marginTop: 4, color: THEME.GREY02 }}>2023.01.30</Text>
            </View>
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0.5,
              }}>
              공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.
              공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.
              공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.
            </Text>
          </View>
        </AppScrollView>
      )}
    </>
  );
};

export default NoticeDetailScreen;
