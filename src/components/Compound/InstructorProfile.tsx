import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
import {GRAY} from '@styles/colors';
import common from '@styles/common';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from '../Common/Icon';
import IconButton from '../Common/IconButton';

interface InstructorProfileProps {
  avatarImageSrc?: string;
  nickname: string;
  isCertificated: boolean;
  field: string;
  career: string;
  address: string;
  followerCount: string;
  onFavorite?: () => void;
  onPress?: () => void;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({
  avatarImageSrc,
  nickname,
  isCertificated,
  field,
  career,
  address,
  followerCount,
  onFavorite,
  onPress,
}) => {
  return (
    <View>
      <Pressable style={styles.profileBox} onPress={onPress}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image
            source={avatarImageSrc ? {uri: avatarImageSrc} : iconPath.THUMBNAIL}
            style={styles.thumbnail}
          />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>
              {nickname}
            </Text>
            {isCertificated && (
              <View style={common.rowCenter}>
                <Text style={[common.text_s, {color: THEME.PRIMARY}]}>
                  인증강사
                </Text>
                <Icon
                  style={{marginLeft: 2}}
                  size={14}
                  source={iconPath.CERTIFICATION}
                />
              </View>
            )}
          </View>
          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>{field}</Text>
            <Text style={[common.text, common.mr8, {alignSelf: 'flex-end'}]}>
              {career}
            </Text>
            <Text style={[common.text_s, common.fcg]}>{address}</Text>
          </View>
          <View style={common.rowCenter}>
            <IconButton
              style={{marginRight: 8}}
              source={iconPath.FAVORITE_FILL}
              onPress={onFavorite}
            />
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              {followerCount}
            </Text>
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
  profileBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  thumbnailBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 200,
    backgroundColor: GRAY.LIGHT,
  },
  thumbnail: {width: 64, height: 64, borderRadius: 200},
  nextArrow: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
});

export default InstructorProfile;
