import { LoggedInParamList } from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import { useMemberInfo } from '@/hooks/member/use-member-info';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import CommunityMyScreenTabView from '@/screen/community/community-my-tab-view.screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.COMMUNITY.MY>;

export const CommunityMyScreen = ({}: Props) => {
  const { data } = useMemberInfo();

  if (!data) return null;

  return (
    <>
      <View style={styles.container}>
        <View style={common.mb16}>
          <View style={common.row}>
            <Image
              source={iconPath.THUMBNAIL}
              style={[common.thumbnail, common.mr8, { width: 64, height: 64 }]}
            />
            <View>
              <View style={common.rowCenter}>
                <Text style={[common.text_m, common.fwb, common.mr8]}>
                  {data.nickname ? data.nickname : data.name}
                </Text>
                <View>
                  {data.type === MEMBER_TYPE.INSTRUCTOR ? (
                    <View style={common.rowCenter}>
                      <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
                      <Image
                        style={{ marginLeft: 2, width: 14, height: 14 }}
                        source={iconPath.CERTIFICATION}
                      />
                    </View>
                  ) : (
                    <View style={common.rowCenter}>
                      <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>
                        {data.type === MEMBER_TYPE.COMPANY ? '센터' : '일반인'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={common.row}>
                <Text style={[common.text_m, common.fwb, common.mr4]}>
                  {data?.type === MEMBER_TYPE.COMPANY ? data.company?.field : data.field}
                </Text>
                <Text style={[common.text, { alignSelf: 'flex-end' }]}>{data.career}</Text>
              </View>
              <Text style={[common.text_s, { color: GRAY.DARK }]}>
                {data.address} · {data.addressDetail}
              </Text>
            </View>
            {/*<Pressable style={styles.kebabIcon} hitSlop={10}>*/}
            {/*  <Image source={iconPath.KEBAB} style={[common.size24]} />*/}
            {/*</Pressable>*/}
          </View>
          <View style={common.mt16}>
            <CTAButton label="MY 프로필 수정하기" />
          </View>
        </View>
      </View>
      <CommunityMyScreenTabView />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: { position: 'absolute', top: 16, right: 0 },
});
