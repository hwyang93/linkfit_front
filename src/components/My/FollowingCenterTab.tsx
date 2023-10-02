import { useMemberFollowingList } from '@/hooks/member/use-member-following-list';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';
import IconButton from '../Common/IconButton';
import EmptySet from '../EmptySet';

import hairlineWidth = StyleSheet.hairlineWidth;

const FollowingCenterTab: React.FC = () => {
  const { data } = useMemberFollowingList({ type: MEMBER_TYPE.COMPANY });
  const followings = data;

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const toggleFavorite = () => {};

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
        {followings?.length === 0 && <EmptySet text="팔로우 중인 센터가 없어요" />}
        {followings?.map((following) => (
          <View
            key={`${following.seq} ${following.memberSeq} ${following.favoriteSeq}`}
            style={styles.listBox}>
            <Pressable
              onPress={() =>
                navigation.navigate('CenterInfo', {
                  memberSeq: following.favoriteSeq,
                })
              }>
              <View style={common.mb16}>
                {/* TODO: 하드코딩 제거 */}
                <Image
                  source={require('@images/center_01.png')}
                  resizeMode={'cover'}
                  style={common.imgBox}
                />
              </View>
              <Text style={common.title}>{following.followingMember.company?.companyName}</Text>
              <View style={common.rowCenterBetween}>
                <Text style={[common.text_s, { color: GRAY.DARK }]}>
                  {following.followingMember.company?.field} | 서울 · 송파구
                </Text>
                <View style={common.rowCenterBetween}>
                  {/* <Pressable
                    style={common.mh4}
                    onPress={() => Alert.alert('전화', '전화를 걸어주세용')}>
                    <Image source={iconPath.PHONE} style={common.size24} />
                  </Pressable> */}
                  {/* <Pressable
                    style={common.mh4}
                    onPress={() => Alert.alert('쪽지', '쪽지를 보내주세용')}>
                    <Image source={iconPath.MESSAGE} style={common.size24} />
                  </Pressable> */}
                  <IconButton source={iconPath.FAVORITE_ON} onPress={toggleFavorite} />
                </View>
              </View>
            </Pressable>
          </View>
        ))}

        {/*<View style={styles.followingBox}>*/}
        {/*  <View>*/}
        {/*    <CenterInfoComponent />*/}
        {/*  </View>*/}
        {/*</View>*/}
      </ScrollView>
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
  listBox: {
    borderBottomWidth: hairlineWidth,
    borderColor: GRAY.DEFAULT,
    paddingVertical: 16,
  },
  thumbnail: { borderRadius: 8, height: 160, marginBottom: 16, width: '100%' },
});

export default FollowingCenterTab;
