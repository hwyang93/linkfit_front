import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';
import {GRAY} from '@styles/colors';
import {useState} from 'react';

type titleProps = {
  title: string;
  index: number;
  setModalVisible: (pressButton: boolean) => void;
  setSelected: any;
  filterType: string;
};

export const FilterTypes = {
  POSITION: 'POSITION',
  RECRUITMENT_TYPE: 'RECRUITMENT_TYPE',
  TIME: 'TIME',
  RESET: 'RESET',
};

function Filter({title, setModalVisible, setSelected, filterType}: titleProps) {
  const pressButton = item => {
    setSelected(item);
    setModalVisible(true);
    console.log('hi', filterType);
  };
  return (
    <View style={styles.box}>
      <Pressable onPress={pressButton} style={styles.item}>
        <Text style={[common.text_m, {color: GRAY.DARK, marginRight: 8}]}>
          {title}
        </Text>
        <Image style={styles.downArrow} source={iconPath.MORE_ARROW_DOWN} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 30,
    marginRight: 8,
    // height: 28,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
    borderRadius: 16,
  },
  title: {
    color: '#666',
    fontSize: 16,
  },
  selected: {},
  downArrow: {
    position: 'absolute',
    top: 16,
    right: 11,
    width: 10,
    height: 6,
  },
});
export default Filter;
