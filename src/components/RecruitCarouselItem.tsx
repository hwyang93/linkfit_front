import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

type ListProps = {
  item: {
    num: number;
    position: string;
    company: string;
    area: string;
    src: any;
    color: string;
  };
};

function RecruitListItem({item}: ListProps) {
  // console.log('뭐나오지', item);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <Pressable
      style={styles.slideBox}
      onPress={() => navigation.navigate('CenterInfo')}>
      <View style={styles.imgBox}>
        <Image source={item.src} resizeMode={'cover'} />
      </View>
      <View style={styles.infoBox}>
        {/* 포지션 */}
        <Text style={[common.text_m, common.fwb]}>{item.position}</Text>
        {/* 업체명 */}
        <Text style={[common.text_s, common.fwb]}>{item.company}</Text>
        {/* 지역 */}
        <Text style={common.text_s}>{item.area}</Text>
        <Pressable
          style={styles.bookmark}
          onPress={() => Alert.alert('click', 'bookmark')}>
          <Image source={iconPath.BOOKMARK} style={[common.BOOKMARK]} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slideBox: {marginRight: 8, width: 160},
  imgBox: {marginBottom: 8, width: 160, height: 104, borderRadius: 8},
  infoBox: {position: 'relative'},
  bookmark: {position: 'absolute', top: 5, right: 0},
});

export default RecruitListItem;
