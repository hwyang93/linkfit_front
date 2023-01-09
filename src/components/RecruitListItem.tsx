import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import common from '../styles/common';
import {iconPath} from '../util/iconPath';

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
  console.log(item);
  return (
    <View style={styles.slideBox}>
      <View style={styles.imgBox}>
        <Image source={item.src} resizeMode={'cover'} />
      </View>
      <View style={styles.infoBox}>
        <Text style={[common.text_m, common.fwb]}>{item.position}</Text>
        <Text style={[common.text_s, common.fwb]}>{item.company}</Text>
        <Text style={common.text_s}>{item.area}</Text>
        <Image
          source={iconPath.BOOKMARK}
          style={[common.BOOKMARK, styles.bookmark]}
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
  bookmark: {position: 'absolute', top: 5, right: 0},
});

export default RecruitListItem;
