import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import {GRAY} from '@styles/colors';
import common from '@styles/common';

function TopFilter({data}) {
  console.log('확인이 필요행요', data);
  return (
    <>
      <View style={styles.filterBox}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({item}) => (
            <Pressable style={styles.filterItem} onPress={item.job}>
              <Text style={[common.text_m, styles.filterText]}>
                {item.value}
              </Text>
              <Image
                style={styles.filterIcon}
                source={iconPath.MORE_ARROW_DOWN}
              />
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filterBox: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 30,
    marginRight: 8,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
    borderRadius: 16,
  },
  filterText: {
    color: GRAY.DARK,
  },
  filterIcon: {
    position: 'absolute',
    top: 16,
    right: 12,
    width: 10,
    height: 6,
  },
});

export default TopFilter;
