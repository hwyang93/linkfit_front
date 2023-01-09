import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '../styles/common';
import {iconPath} from '../util/iconPath';
import React from 'react';

type ListProps = {
  item: {
    position: string;
    career: string;
    nickname: string;
    area: string;
    hit: number;
  };
};

function InstructorListItem({item}: ListProps) {
  return (
    <View style={styles.listBox}>
      <View style={{marginRight: 16}}>
        <Image
          source={require('../assets/images/thumbnail.png')}
          style={{width: 80, height: 80}}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[common.text_s, common.fwb, common.mr8]}>
            {item.position}
          </Text>
          <Text style={[common.text_s]}>{item.career}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {item.nickname}
          </Text>
          <Text style={[common.text_s, {color: '#3962f3'}]}>인증강사</Text>
        </View>
        <Text style={[common.text_s]}>{item.area}</Text>
      </View>
      <Image
        source={iconPath.MORE_VERT}
        style={[
          common.MORE_VERT,
          {
            position: 'absolute',
            top: 16,
            right: 0,
          },
        ]}
      />
      <View style={styles.rightBox}>
        <Pressable>
          <Image
            source={iconPath.MESSAGE}
            style={[common.MESSAGE, {marginRight: 8}]}
          />
        </Pressable>
        <Pressable>
          <Image
            source={iconPath.FAVORITE}
            style={[common.FAVORITE, {marginRight: 8}]}
          />
        </Pressable>
        <Text style={[common.text_m, common.fwb]}>{item.hit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  rightBox: {
    position: 'absolute',
    bottom: 16,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default InstructorListItem;
