import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

type ListProps = {
  item: {
    seq: number;
    position: string;
    title: string;
    companyName: string;
    address: string;
    src: any;
    // color: string;
    writer: any;
  };
};

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 48) / 2;

function RecruitListItem({item}: ListProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <Pressable
      style={styles.itemBox}
      onPress={() => navigation.navigate('JobPost', {recruitSeq: item.seq})}>
      <View style={styles.imgBox}>
        <Image
          style={styles.img}
          source={
            item.writer.profileImage
              ? {uri: item.writer.profileImage.originFileUrl}
              : iconPath.CENTER_DEFAULT
          }
        />
      </View>

      <View>
        {/* 포지션 */}
        <Text style={[common.text]}>{item.position}</Text>
        {/* 제목 */}
        <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
          {item.title}
        </Text>
        {/* 업체명 */}
        <Text style={[common.text_s, common.fwb]}>{item.companyName}</Text>
        {/* 지역 */}
        <Text style={common.text}>{item.address}</Text>
        <Pressable
          style={styles.bookmark}
          onPress={() => Alert.alert('click', 'bookmark')}>
          <Image source={iconPath.BOOKMARK} style={[common.size24]} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemBox: {width: columns2, marginBottom: 16, marginHorizontal: 4},
  imgBox: {
    marginBottom: 8,
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', height: 104, borderRadius: 8},
  bookmark: {position: 'absolute', top: 0, right: 13},
});

export default RecruitListItem;
