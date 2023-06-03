import {Instructor} from '@/types/api/instructor';
import {iconPath} from '@/utils/iconPath';
import Modal from '@components/ModalSheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BLUE} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

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
  item: Instructor;
  style?: StyleProp<ViewStyle>;
}

const InstructorListItem: React.FC<InstructorListItemProps> = ({
  item,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View style={[styles.listBox, style]}>
      <Pressable
        style={common.mr16}
        onPress={() => navigation.navigate('Profile', {memberSeq: item.seq})}>
        <Image
          source={
            item.profileImage
              ? {uri: item.profileImage.originFileUrl}
              : iconPath.THUMBNAIL
          }
          style={styles.thumbnail}
        />
      </Pressable>
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {item.field}
          </Text>
          <Text style={[common.text]}>{item.career}</Text>
        </View>

        <View style={common.rowCenter}>
          <Text style={[common.title, common.mr8]}>{item.nickname}</Text>
          <View style={common.rowCenter}>
            <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>인증강사</Text>
            <Image
              style={{marginLeft: 2, width: 14, height: 14}}
              source={iconPath.CERTIFICATION}
            />
          </View>
        </View>
        <Text style={[common.text_s, common.fcg]}>{item.address}</Text>
      </View>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={() => setModalVisible(true)}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
      <View style={styles.rightBox}>
        <Pressable onPress={() => Alert.alert('click', 'test')}>
          <Image
            source={iconPath.MESSAGE}
            style={[common.size24, common.mr8]}
          />
        </Pressable>
        <Pressable onPress={() => Alert.alert('click', 'test')}>
          <Image
            source={iconPath.FAVORITE}
            style={[common.size24, common.mr4]}
          />
        </Pressable>
        <Text style={[common.text_m, common.fwb]}>{item.followerCount}</Text>
      </View>

      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        content={
          <View>
            {MODAL.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    onPress={item.job}
                    style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text style={[common.modalText]}>{item.value}</Text>
                  </Pressable>
                </View>
              );
            })}
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
  thumbnail: {width: 80, height: 80, borderRadius: 200},
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
