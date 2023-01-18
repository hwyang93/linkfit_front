import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';
import {GRAY} from '@styles/colors';

// const FilterProps = {
//   POSITION: {
//     title: '포지션',
//   },
//   RECRUITMENT_TYPE: {
//     title: '채용형태',
//   },
//   TIME: {
//     title: '수업시간',
//   },
// };

// type FilterTypeProps = {
//   // filterType: any;
//   item: string;
//   filterType: typeof FilterProps;
//   // filterType: keyof typeof FilterProps;
// };
type titleProps = {
  // pressed: boolean;
  title: string;
  filterType: any;
};

export const FilterTypes = {
  POSITION: 'POSITION',
  RECRUITMENT_TYPE: 'RECRUITMENT_TYPE',
  TIME: 'TIME',
  RESET: 'RESET',
};

// const FilterIconProps = {
//   YOGA: iconPath.YOGA,
//   PILATES: iconPath.PILATES,
//   ALL: iconPath.LINK,
// };

function Filter({title, filterType}: titleProps) {
  console.log(filterType);
  // const filterSelect() {
  //
  // }
  return (
    <View style={styles.box}>
      <Pressable onPress={() => {}} style={styles.item}>
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
