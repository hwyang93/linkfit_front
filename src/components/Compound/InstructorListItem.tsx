import useModal from '@/hooks/useModal';
import {iconPath} from '@/utils/iconPath';
import {BLUE} from '@styles/colors';
import common from '@styles/common';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Avatar from '../Common/Avatar';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import Icon from '../Common/Icon';
import IconButton from '../Common/IconButton';

interface InstructorListItemProps {
  style?: StyleProp<ViewStyle>;
  avatarImageSrc?: string;
  field: string;
  career: string;
  nickname: string;
  address: string;
  followerCount: number;
  isCertificated: boolean;
  onBlock: () => void;
  onReport: () => void;
  onMessageIconPress: () => void;
  onFavoriteIconPress: () => void;
  onAvatarPress: () => void;
}

const InstructorListItem: React.FC<InstructorListItemProps> = ({
  style,
  avatarImageSrc,
  field,
  career,
  nickname,
  address,
  followerCount,
  isCertificated,
  onBlock,
  onReport,
  onMessageIconPress,
  onFavoriteIconPress,
  onAvatarPress,
}) => {
  const modal = useModal();

  return (
    <View style={[styles.listBox, style]}>
      <Avatar
        style={common.mr16}
        size={80}
        source={avatarImageSrc ? {uri: avatarImageSrc} : iconPath.THUMBNAIL}
        onPress={onAvatarPress}
      />
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>{field}</Text>
          <Text style={[common.text]}>{career}</Text>
        </View>
        <View style={common.rowCenter}>
          <Text style={[common.title, common.mr8]}>{nickname}</Text>
          {isCertificated && (
            <View style={common.rowCenter}>
              <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                인증강사
              </Text>
              <Icon
                size={14}
                style={{marginLeft: 2}}
                source={iconPath.CERTIFICATION}
              />
            </View>
          )}
        </View>
        <Text style={[common.text_s, common.fcg]}>{address}</Text>
      </View>
      <IconButton
        source={iconPath.KEBAB}
        style={styles.kebabIcon}
        onPress={modal.open}
      />
      <View style={styles.rightBox}>
        <IconButton
          style={{marginRight: 8}}
          source={iconPath.MESSAGE}
          onPress={onMessageIconPress}
        />
        <IconButton
          style={{marginRight: 4}}
          source={iconPath.FAVORITE}
          onPress={onFavoriteIconPress}
        />
        <Text style={[common.text_m, common.fwb]}>{followerCount}</Text>
      </View>
      <BottomSheet visible={modal.visible} onDismiss={modal.close}>
        <BottomSheetOption
          label="차단하기"
          onPress={() => {
            onBlock();
            modal.close();
          }}
        />
        <BottomSheetOption
          label="신고하기"
          onPress={() => {
            onReport();
            modal.close();
          }}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  listBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rightBox: {
    position: 'absolute',
    bottom: 16,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default InstructorListItem;
