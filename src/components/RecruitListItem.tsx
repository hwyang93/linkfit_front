import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

type ListProps = {
  item: {
    num: number;
    position: string;
    title: string;
    company: string;
    area: string;
    src: any;
    color: string;
  };
};

function RecruitListItem({item}: ListProps) {
  return (
    <Pressable
      style={styles.itemBox}
      onPress={() => Alert.alert('click', 'thumbnail')}>
      <View style={styles.imgBox}>
        <Image style={styles.img} source={item.src} />
      </View>
      <View>
        {/* 포지션 */}
        <Text style={[common.text]}>{item.position}</Text>
        {/* 제목 */}
        <Text style={[common.text_m, common.fwb]}>
          {item.title.length < 10
            ? item.title
            : item.title.slice(0, 10) + '...'}
        </Text>
        {/* 업체명 */}
        <Text style={[common.text_s, common.fwb]}>{item.company}</Text>
        {/* 지역 */}
        <Text style={common.text}>{item.area}</Text>
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
  itemBox: {width: '48%', marginBottom: 16, marginHorizontal: '1%'},
  imgBox: {
    marginBottom: 8,
    width: '100%',
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', borderRadius: 8},
  bookmark: {position: 'absolute', top: 3, right: 13},
});

export default RecruitListItem;
