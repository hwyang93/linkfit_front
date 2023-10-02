import { iconPath } from '@/lib/iconPath';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface FilterProps {
  title: string;
  index: number;
  setModalVisible: (pressButton: boolean) => void;
  setSelected: any;
  filterType: string;
}

export const FilterTypes = {
  POSITION: 'POSITION',
  RECRUITMENT_TYPE: 'RECRUITMENT_TYPE',
  TIME: 'TIME',
  RESET: 'RESET',
};

const Filter: React.FC<FilterProps> = ({ title, setModalVisible, setSelected }) => {
  const pressButton = (item: any) => {
    setSelected(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.box}>
      <Pressable onPress={pressButton} style={styles.item}>
        <Text style={[common.text_m, { color: GRAY.DARK, marginRight: 8 }]}>{title}</Text>
        <Image style={styles.downArrow} source={iconPath.MORE_ARROW_DOWN} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
  },
  downArrow: {
    height: 6,
    position: 'absolute',
    right: 11,
    top: 16,
    width: 10,
  },
  item: {
    alignItems: 'center',
    borderColor: GRAY.LIGHT,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: 8,
    paddingLeft: 12,
    paddingRight: 30,
    paddingVertical: 6,
  },
  selected: {},
  title: {
    color: '#666',
    fontSize: 16,
  },
});
export default Filter;
