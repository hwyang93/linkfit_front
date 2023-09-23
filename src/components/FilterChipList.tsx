import { FlatList, StyleSheet, View } from 'react-native';
import FilterChip from './Common/FilterChip';

interface FilterChipListProps {
  chipData: {
    label: string;
    value: string;
  }[];
  onChipPress: (label: string) => void;
}

const FilterChipList: React.FC<FilterChipListProps> = ({ chipData, onChipPress }) => {
  return (
    <View style={styles.filterBox}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={chipData}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <FilterChip
            style={{ marginRight: 8 }}
            label={item.label}
            onPress={() => onChipPress(item.value)}
            rightIcon
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
