import { MEMBER_TYPE } from '@/lib/constants/enum';
import { iconPath } from '@/lib/iconPath';
import { MemberEntity } from '@/types/api/entities.type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BLUE, GRAY } from '@styles/colors';
import common from '@styles/common';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoggedInParamList } from '../../AppInner';

interface ProfileBoxProps {
  memberInfo: MemberEntity;
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ memberInfo }) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View>
      <Pressable style={styles.profileBox} onPress={() => navigation.navigate('MyProfile')}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image
            source={
              memberInfo.profileImage
                ? { uri: memberInfo.profileImage.originFileUrl }
                : iconPath.THUMBNAIL
            }
            style={styles.thumbnail}
          />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>
              {!memberInfo.nickname ? memberInfo.name : memberInfo.nickname}
            </Text>
            {memberInfo.type === MEMBER_TYPE.INSTRUCTOR && (
              <View style={common.rowCenter}>
                <Text style={[common.text_s, { color: BLUE.DEFAULT, marginRight: 2 }]}>
                  인증강사
                </Text>
                <Image style={{ width: 14, height: 14 }} source={iconPath.CERTIFICATION} />
              </View>
            )}
          </View>

          <View style={common.rowCenter}>
            {memberInfo.field && (
              <Text style={[common.text_m, common.fwb, common.mr8]}>{memberInfo.field}</Text>
            )}
            <Text style={[common.text, common.mr8, { alignSelf: 'flex-end' }]}>
              {memberInfo.career}
            </Text>
            <Text style={[common.text_s, common.fcg]}>{memberInfo.address}</Text>
          </View>

          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('click', 'test')}>
              <Image source={iconPath.FAVORITE_FILL} style={[common.size24, common.mr8]} />
            </Pressable>
            <Text style={[common.text_m, common.fwb, common.mr8]}>{memberInfo.followerCount}</Text>
          </View>
        </View>
        <View style={styles.nextArrow}>
          <FontAwesome name={'chevron-right'} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  nextArrow: {
    position: 'absolute',
    right: 0,
    top: '50%',
  },
  profileBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 16,
    position: 'relative',
  },
  thumbnail: { borderRadius: 200, height: 64, width: 64 },
  thumbnailBox: {
    alignItems: 'center',
    backgroundColor: GRAY.LIGHT,
    borderRadius: 200,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
});

export default ProfileBox;
