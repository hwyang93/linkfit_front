import {iconPath} from '@/utils/iconPath';
import Modal from '@components/ModalSheet';
import {BLUE} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {
  Alert,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Avatar from '../Common/Avatar';
import Icon from '../Common/Icon';
import IconButton from '../Common/IconButton';

// TODO: 모달 로직 밖으로 분리 필요

const MODAL = [
  {
    value: '차단하기',
    job: () => {},
  },
  {
    value: '신고하기',
    job: () => {},
  },
];

interface InstructorListItemProps {
  style?: StyleProp<ViewStyle>;
  avatarImageSrc?: string;
  field: string;
  career: string;
  nickname: string;
  address: string;
  followerCount: number;
  isCertificated: boolean;
  onAvatarPress?: () => void;
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
  onAvatarPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

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
        onPress={() => setModalVisible(true)}
      />
      <View style={styles.rightBox}>
        <IconButton
          style={{marginRight: 8}}
          source={iconPath.MESSAGE}
          onPress={() => Alert.alert('click', 'test')}
        />
        <IconButton
          style={{marginRight: 4}}
          source={iconPath.FAVORITE}
          onPress={() => Alert.alert('click', 'test')}
        />
        <Text style={[common.text_m, common.fwb]}>{followerCount}</Text>
      </View>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="더보기"
        content={
          <View>
            {MODAL.map((item, index) => (
              <View key={index} style={common.modalItemBox}>
                <Pressable
                  onPress={item.job}
                  style={[common.rowCenterBetween, {width: '100%'}]}>
                  <Text style={[common.modalText]}>{item.value}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        }
      />
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
