import {iconPath} from '@/utils/iconPath';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Chip from './Common/Chip';

interface TopFilterProps {
  data: {
    key?: string;
    value: string;
    job?: () => void;
  }[];
}

const TopFilter: React.FC<TopFilterProps> = ({data}) => {
  return (
    <View style={styles.filterBox}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 16}}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        renderItem={({item}) => (
          <Chip
            style={{marginRight: 8}}
            label={item.value}
            onPress={item.job}
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

export default TopFilter;
