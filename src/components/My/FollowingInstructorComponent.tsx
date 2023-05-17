import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import common from '@styles/common';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {iconPath} from '@/utils/iconPath';
import {useCallback, useEffect, useState} from 'react';
import {fetchMemberFollowings} from '@api/member';
import toast from '@hooks/toast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

function FollowingInstructorComponent() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [followings, setFollowings] = useState<any[]>([]);

  const getMemberFollowingList = useCallback(() => {
    fetchMemberFollowings('INSTRUCTOR ')
      .then(({data}: any) => {
        setFollowings(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    getMemberFollowingList();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/*<View>*/}
      {followings.map(following => {
        return (
          <Pressable
            key={`${following.seq} ${following.memberSeq} ${following.favoriteSeq}`}
            onPress={() =>
              navigation.navigate('Profile', {memberSeq: following.favoriteSeq})
            }>
            <View style={styles.reviewBox}>
              <View style={common.rowCenter}>
                <Image
                  source={require('../../assets/images/thumbnail.png')}
                  style={styles.thumbnail}
                />
                <View style={{flex: 1}}>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_m, common.fwb, common.mr8]}>
                      {following.followingMember.field}
                    </Text>
                    <Text style={[common.text]}>{following.career}</Text>
                  </View>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_l, common.fwb, common.mr8]}>
                      {following.followingMember.nickname
                        ? following.followingMember.nickname
                        : following.followingMember.name}
                    </Text>
                    <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                      인증강사
                    </Text>
                    <Image
                      style={{marginLeft: 2, width: 14, height: 14}}
                      source={iconPath.CERTIFICATION}
                    />
                  </View>
                  <View style={[common.rowCenterBetween]}>
                    <Text style={[common.text_s, {flex: 1}]}>지역</Text>
                    <View style={[common.rowCenter, {}]}>
                      <View>
                        <Image
                          source={iconPath.MESSAGE}
                          style={common.size24}
                        />
                      </View>
                      <View>
                        <Image
                          source={iconPath.FAVORITE_ON}
                          style={common.size24}
                        />
                      </View>
                      <Text
                        style={[
                          common.text_m,
                          common.fwb,
                          {alignSelf: 'flex-end'},
                        ]}>
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
        );
      })}
      {/*</View>*/}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  reviewBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginRight: 12, width: 80, height: 80},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default FollowingInstructorComponent;
