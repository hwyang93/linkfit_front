import { iconPath } from '@/lib/iconPath';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoggedInParamList } from '../../AppInner';

const ProfileBox: React.FC<any> = ({ memberInfo }) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View>
      <Pressable
        style={styles.profileBox}
        onPress={() => navigation.navigate('CenterProfile', { memberSeq: memberInfo.seq })}>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>
              {memberInfo?.company.companyName}
            </Text>
            <View style={common.rowCenter}>
              <Pressable onPress={() => Alert.alert('click', 'test')}>
                <Image source={iconPath.FAVORITE_FILL} style={[common.size24, common.mr4]} />
              </Pressable>
              <Text style={[common.text_m, common.fwb, common.mr8]}>
                {memberInfo?.followerCount}
              </Text>
            </View>
          </View>
          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>{memberInfo?.company.field}</Text>
            <Text style={[common.text, { color: GRAY.DARK }]}>
              {memberInfo?.company.address} · {memberInfo?.company.addressDetail}
            </Text>
          </View>
        </View>
        <View style={styles.nextArrow}>
          <FontAwesome name={'chevron-right'} color="black" />
        </View>

        {/*<Pressable*/}
        {/*  style={styles.pencil}*/}
        {/*  onPress={() => Alert.alert('click', 'bookmark')}>*/}
        {/*  <Image source={iconPath.PENCIL_B} style={[common.size24]} />*/}
        {/*</Pressable>*/}
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
  thumbnail: { height: '50%', width: '50%' },
  // pencil: {position: 'absolute', top: 0, right: 0},
});

export default ProfileBox;
