import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import common from '../styles/common';

type ListProps = {
  item: {
    num: number;
    position: string;
    company: string;
    area: string;
    color: string;
  };
  // style: ViewStyle;
};

function RecruitCarouselItem({item}: ListProps) {
  console.log(item);
  return (
    <View style={styles.slideBox}>
      <View style={styles.imgBox}>
        <Image
          source={require('../assets/images/sample_01.png')}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={[common.text_m, common.fwb]}>{item.position}</Text>
        <Text style={[common.text_s, common.fwb]}>{item.company}</Text>
        <Text style={common.text_s}>{item.area}</Text>
        <Image
          source={require('../assets/images/icon/bookmark.png')}
          style={styles.bookmark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slideWrap: {marginTop: 16},
  slideBox: {marginRight: 8, width: 160},
  imgBox: {marginBottom: 8, width: 160, height: 104, borderRadius: 8},
  infoBox: {position: 'relative'},
  bookmark: {position: 'absolute', top: 0, right: 0, width: 14, height: 18},
});

export default RecruitCarouselItem;
