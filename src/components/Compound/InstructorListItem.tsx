import { useMemberFollow } from '@/hooks/member/use-member-follow';
import { useMemberUnfollow } from '@/hooks/member/use-member-unfollow';
import { iconPath } from '@/lib/iconPath';
import { BLUE } from '@styles/colors';
import common from '@styles/common';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Avatar from '../Common/Avatar';
import Icon from '../Common/Icon';
import IconButton from '../Common/IconButton';

interface InstructorListItemProps {
  style?: StyleProp<ViewStyle>;
  instructorId: number;
  avatarImageSrc?: string;
  field: string;
  career: string;
  nickname: string;
  address: string;
  following: boolean;
  followerCount: number;
  isCertificated: boolean;
  onAvatarPress: () => void;
}

const InstructorListItem: React.FC<InstructorListItemProps> = ({
  style,
  instructorId,
  avatarImageSrc,
  field,
  career,
  nickname,
  address,
  following,
  followerCount,
  isCertificated,
  onAvatarPress,
}) => {
  const memberFollowMutation = useMemberFollow();
  const memberUnfollowMutation = useMemberUnfollow();

  const onFavoriteIconPress = () => {
    if (following) {
      memberUnfollowMutation.mutate(instructorId);
    }

    if (!following) {
      memberFollowMutation.mutate(instructorId);
    }
  };

  // const onBlockPress = () => {
  //   // TODO: 차단하기 API 연결
  //   Alert.alert('기능 준비 중입니다.');
  //   modal.close();
  // };

  // const onReportPress = () => {
  //   // TODO: 신고하기 API 연결
  //   Alert.alert('기능 준비 중입니다.');
  //   modal.close();
  // };

  return (
    <View style={[styles.listBox, style]}>
      <Avatar
        style={common.mr16}
        size={80}
        source={avatarImageSrc ? { uri: avatarImageSrc } : iconPath.THUMBNAIL}
        onPress={onAvatarPress}
      />
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>{field}</Text>
          <Text style={common.text}>{career}</Text>
        </View>
        <View style={common.rowCenter}>
          <Text style={[common.title, common.mr8]}>{nickname}</Text>
          {isCertificated && (
            <View style={common.rowCenter}>
              <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
              <Icon size={14} style={{ marginLeft: 2 }} source={iconPath.CERTIFICATION} />
            </View>
          )}
        </View>
        <Text style={[common.text_s, common.fcg]}>{address}</Text>
      </View>
      {/* <IconButton
        source={iconPath.KEBAB}
        style={styles.kebabIcon}
        onPress={modal.open}
      /> */}
      <View style={styles.rightBox}>
        {/* <IconButton
          style={{marginRight: 8}}
          source={iconPath.MESSAGE}
          onPress={onMessageIconPress}
        /> */}
        <IconButton
          style={{ marginRight: 4 }}
          source={following ? iconPath.FAVORITE_ON : iconPath.FAVORITE}
          onPress={onFavoriteIconPress}
        />
        <Text style={[common.text_m, common.fwb]}>{followerCount}</Text>
      </View>
      {/* <BottomSheet visible={modal.visible} onDismiss={modal.close}>
        <BottomSheetOption label="차단하기" onPress={onBlockPress} />
        <BottomSheetOption label="신고하기" onPress={onReportPress} />
      </BottomSheet> */}
    </View>
  );
};

const styles = StyleSheet.create({
  kebabIcon: { position: 'absolute', right: 0, top: 16 },
  listBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    position: 'relative',
  },
  rightBox: {
    alignItems: 'center',
    bottom: 16,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
});

export default InstructorListItem;
