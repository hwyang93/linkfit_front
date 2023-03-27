import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GRAY} from '@styles/colors';
import CenterInfoComponent from '@components/CenterInfoComponent';
import hairlineWidth = StyleSheet.hairlineWidth;
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {fetchMemberFollowings} from '@api/member';
import toast from '@hooks/toast';

function FollowingCenterComponent() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [followings, setFollowings] = useState<any[]>([]);

  const getMemberFollowingList = useCallback(() => {
    fetchMemberFollowings('COMPANY')
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

  const CENTER = [
    {
      image: '',
      title: '',
      field: '',
      location: '',
      phoneNumber: '',
      message: '',
      favorite: '',
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {followings.map(following => {
        return (
          <View
            key={`${following.seq} ${following.memberSeq} ${following.favoriteSeq}`}
            style={styles.listBox}>
            <Pressable onPress={() => navigation.navigate('CenterInfo')}>
              <View style={common.mb16}>
                <Image
                  source={require('@images/center_01.png')}
                  resizeMode={'cover'}
                  style={common.imgBox}
                />
              </View>
              <Text style={common.title}>
                {following.followingMember.company.companyName}
              </Text>
              <View style={common.rowCenterBetween}>
                <Text style={[common.text_s, {color: GRAY.DARK}]}>
                  {following.followingMember.company.field} | 서울 · 송파구
                </Text>
                <View style={common.rowCenterBetween}>
                  <Pressable
                    style={common.mh4}
                    onPress={() => Alert.alert('전화', '전화를 걸어주세용')}>
                    <Image source={iconPath.PHONE} style={common.size24} />
                  </Pressable>
                  <Pressable
                    style={common.mh4}
                    onPress={() => Alert.alert('쪽지', '쪽지를 보내주세용')}>
                    <Image source={iconPath.MESSAGE} style={common.size24} />
                  </Pressable>
                  <Pressable
                    style={common.mh4}
                    onPress={() => Alert.alert('하트', '하트를 눌러주세용')}>
                    <Image
                      source={iconPath.FAVORITE_ON}
                      style={common.size24}
                    />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </View>
        );
      })}

      {/*<View style={styles.followingBox}>*/}
      {/*  <View>*/}
      {/*    <CenterInfoComponent />*/}
      {/*  </View>*/}
      {/*</View>*/}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  listBox: {
    paddingVertical: 16,
    borderBottomWidth: hairlineWidth,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginBottom: 16, width: '100%', height: 160, borderRadius: 8},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default FollowingCenterComponent;
