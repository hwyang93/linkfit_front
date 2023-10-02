import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
  isFavorite: boolean;
  onFavorite: () => void;
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
  isFavorite: initialIsFavorite,
  onFavorite,
  onPress,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const onFavoriteIconPress = () => {
    onFavorite();
    setIsFavorite(!isFavorite);
  };

  return (
    <View>
      <Pressable style={styles.profileBox} onPress={onPress}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image
            source={avatarImageSrc ? { uri: avatarImageSrc } : iconPath.THUMBNAIL}
            style={styles.thumbnail}
          />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>{nickname}</Text>
            {isCertificated && (
              <View style={common.rowCenter}>
                <Text style={[common.text_s, { color: THEME.PRIMARY }]}>인증강사</Text>
                <Icon style={{ marginLeft: 2 }} size={14} source={iconPath.CERTIFICATION} />
              </View>
            )}
          </View>
          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>{field}</Text>
            <Text style={[common.text, common.mr8, { alignSelf: 'flex-end' }]}>{career}</Text>
            <Text style={[common.text_s, common.fcg]}>{address}</Text>
          </View>
          <View style={common.rowCenter}>
            <IconButton
              style={{ marginRight: 8 }}
              source={isFavorite ? iconPath.FAVORITE_FILL : iconPath.FAVORITE}
              onPress={onFavoriteIconPress}
            />
            <Text style={[common.text_m, common.fwb, common.mr8]}>{followerCount}</Text>
          </View>
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

export default InstructorProfile;
