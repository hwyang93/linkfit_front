import { useMemberFollowingList } from '@/hooks/member/use-member-following-list';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BLUE, GRAY } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppScrollView from '../\bLayout/AppScrollView';
import { LoggedInParamList } from '../../../AppInner';
import EmptySet from '../EmptySet';

const FollowingInstructorTab: React.FC = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const { data } = useMemberFollowingList({ type: MEMBER_TYPE.INSTRUCTOR });
  const followings = data;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <AppScrollView>
        {followings?.length === 0 && <EmptySet text="팔로우 중인 강사가 없어요." />}
        {followings?.map((following) => (
          <Pressable
            key={`${following.seq} ${following.memberSeq} ${following.favoriteSeq}`}
            onPress={() =>
              navigation.navigate(ROUTE.INSTRUCTOR.PROFILE, {
                memberSeq: following.favoriteSeq,
              })
            }>
            <View style={styles.reviewBox}>
              <View style={common.rowCenter}>
                <Image
                  source={require('../../assets/images/thumbnail.png')}
                  style={styles.thumbnail}
                />
                <View style={{ flex: 1 }}>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_m, common.fwb, common.mr8]}>
                      {following.followingMember.field}
                    </Text>
                    <Text style={common.text}>{following.career}</Text>
                  </View>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_l, common.fwb, common.mr8]}>
                      {following.followingMember.nickname
                        ? following.followingMember.nickname
                        : following.followingMember.name}
                    </Text>
                    <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
                    <Image
                      style={{ marginLeft: 2, width: 14, height: 14 }}
                      source={iconPath.CERTIFICATION}
                    />
                  </View>
                  <View style={common.rowCenterBetween}>
                    <Text style={[common.text_s, { flex: 1 }]}>지역</Text>
                    <View style={[common.rowCenter, {}]}>
                      <View>
                        <Image source={iconPath.MESSAGE} style={common.size24} />
                      </View>
                      <View>
                        <Image source={iconPath.FAVORITE_ON} style={common.size24} />
                      </View>
                      <Text style={[common.text_m, common.fwb, { alignSelf: 'flex-end' }]}>
                        {following.followingMember.followerCount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/*<Pressable*/}
              {/*  style={styles.kebabIcon}*/}
              {/*  hitSlop={10}*/}
              {/*  onPress={() => Alert.alert('click', 'test')}>*/}
              {/*  <Image source={iconPath.KEBAB} style={[common.size24]} />*/}
              {/*</Pressable>*/}
            </View>
          </Pressable>
        ))}
      </AppScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.WHITE,
    flex: 1,
    height: '100%',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  kebabIcon: { position: 'absolute', right: 0, top: 16 },
  reviewBox: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
    paddingVertical: 16,
  },
  thumbnail: { height: 80, marginRight: 12, width: 80 },
});

export default FollowingInstructorTab;
