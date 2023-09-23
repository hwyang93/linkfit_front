import { Member, MemberType } from '@/types/common';
import { iconPath } from '@/utils/iconPath';
import { BLUE } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface CommunityUserProfileProps {
  isMine?: boolean;
  profileImage?: string;
  name: string;
  writerType?: MemberType;
  field?: string;
  career?: string;
  onKebabPress: () => void;
}

const CommunityUserProfile: React.FC<CommunityUserProfileProps> = ({
  isMine,
  profileImage,
  name,
  writerType,
  field,
  career,
  onKebabPress,
}) => {
  return (
    <View style={common.row}>
      <Image
        source={profileImage ? { uri: profileImage } : iconPath.THUMBNAIL}
        style={[common.thumbnail, common.mr8]}
      />
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>{name}</Text>
          {writerType === Member.Instructor ? (
            <View>
              <View style={common.rowCenter}>
                <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
                <Image
                  style={{ marginLeft: 2, width: 14, height: 14 }}
                  source={iconPath.CERTIFICATION}
                />
              </View>
            </View>
          ) : writerType === Member.Company ? (
            <View>
              <View style={common.rowCenter}>
                <Text>센터</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={common.row}>
          <Text style={[common.text_m, common.fwb, common.mr4]}>
            {writerType === Member.Company && field}
          </Text>
          <Text style={[common.text, { alignSelf: 'flex-end' }]}>{career}</Text>
        </View>
      </View>
      {isMine && (
        <Pressable style={styles.kebabIcon} hitSlop={10} onPress={onKebabPress}>
          <Image source={iconPath.KEBAB} style={[common.size24]} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  kebabIcon: { position: 'absolute', top: 16, right: 0 },
});

export default CommunityUserProfile;
