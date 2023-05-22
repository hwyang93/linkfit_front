import {iconPath} from '@/utils/iconPath';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Chip from './Common/Chip';

interface FilterChipListProps {
  chipData: {
    label: string;
    value: string;
  }[];
  onChipPress: (label: string) => void;
}

const FilterChipList: React.FC<FilterChipListProps> = ({
  chipData,
  onChipPress,
}) => {
  return (
    <View style={styles.filterBox}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 16}}
        data={chipData}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        renderItem={({item}) => (
          <Chip
            style={{marginRight: 8}}
            label={item.label}
            onPress={() => onChipPress(item.value)}
            rightIcon={
              <Image
                style={styles.filterIcon}
                source={iconPath.MORE_ARROW_DOWN}
              />
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterBox: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  filterIcon: {
    width: 10,
    height: 6,
  },
});

export default FilterChipList;
