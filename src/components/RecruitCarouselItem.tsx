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
import {useEffect, useState} from 'react';

const windowWidth = Dimensions.get('window').width;
const imageSize = (windowWidth - 40) / 2;

function RecruitListItem({item}: any) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [recruitInfo, setRecruitInfo] = useState<any>({});

  useEffect(() => {
    if (item.recruit) {
      setRecruitInfo(item.recruit);
    } else {
      setRecruitInfo(item);
    }
  }, [item]);
  return (
    <Pressable
      style={styles.slideBox}
      onPress={() =>
        navigation.navigate('JobPost', {recruitSeq: recruitInfo.seq})
      }>
      <View>
        <Image source={item.src} style={styles.imgBox} resizeMode={'cover'} />
      </View>

      <View style={styles.infoBox}>
        {/* 포지션 */}
        <Text style={[common.text_m, common.fwb]}>{recruitInfo.position}</Text>
        {/* 업체명 */}
        <Text style={[common.text_s, common.fwb]}>{recruitInfo.title}</Text>
        <Text style={[common.text_s, common.fwb]}>
          {recruitInfo.companyName}
        </Text>
        {/* 지역 */}
        <Text style={[common.text_s, common.fcg]}>지역표출할거임</Text>
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
  slideBox: {
    width: imageSize,
    marginRight: 8,
  },
  imgBox: {
    marginBottom: 8,
    width: imageSize,
    height: 104,
    borderRadius: 8,
  },
  infoBox: {position: 'relative'},
  bookmark: {position: 'absolute', top: 0, right: 0},
});

export default RecruitListItem;
