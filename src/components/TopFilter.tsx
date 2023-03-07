import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import {GRAY} from '@styles/colors';
import common from '@styles/common';
import {recruitStore} from '@/zustand/recruitStore';

function TopFilter({data}: any) {
  // zustand 필터값 받기
  // const recruitState = recruitStore(state => state);
  // data[0].value = recruitState.filters.position;
  // data[1].value = recruitState.filters.type;
  // data[2].value = recruitState.filters.date;
  return (
    <>
      <View style={styles.filterBox}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem={({item}) => (
            <Pressable style={styles.filterItem} onPress={item.job}>
              <Text style={[common.text_m, common.fcg]}>{item.value}</Text>
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
  filterIcon: {
    position: 'absolute',
    top: 16,
    right: 12,
    width: 10,
    height: 6,
  },
});

export default TopFilter;
