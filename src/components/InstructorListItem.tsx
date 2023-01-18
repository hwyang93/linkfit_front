import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE} from '@styles/colors';

type ListProps = {
  item: {
    position: string;
    career: string;
    nickname: string;
    area: string;
    hit: number;
    certification: boolean;
  };
};

function InstructorListItem({item}: ListProps) {
  return (
    <View style={styles.listBox}>
      <Pressable
        style={common.mr16}
        onPress={() => Alert.alert('click', 'test')}>
        <Image
          source={require('../assets/images/thumbnail.png')}
          style={styles.thumbnail}
        />
      </Pressable>
      <View>
        <View style={styles.rowBox}>
          <Text style={[common.text_s, common.fwb, common.mr8]}>
            {item.position}
          </Text>
          <Text style={[common.text_s]}>{item.career}</Text>
        </View>

        <View style={styles.rowBox}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {item.nickname}
          </Text>
          {item.certification ? (
            <View style={styles.rowBox}>
              <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                인증강사
              </Text>
              <Image
                style={{marginLeft: 2, width: 14, height: 14}}
                source={iconPath.CERTIFICATION}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        <Text style={[common.text_s]}>{item.area}</Text>
      </View>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={() => Alert.alert('click', 'test')}>
        <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
      </Pressable>
      <View style={styles.rightBox}>
        <Pressable onPress={() => Alert.alert('click', 'test')}>
          <Image
            source={iconPath.MESSAGE}
            style={[common.MESSAGE, common.mr8]}
          />
        </Pressable>
        <Pressable onPress={() => Alert.alert('click', 'test')}>
          <Image
            source={iconPath.FAVORITE}
            style={[common.FAVORITE, common.mr8]}
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
  },
  thumbnail: {width: 80, height: 80},
  rowBox: {flexDirection: 'row', alignItems: 'center'},
  rightBox: {
    position: 'absolute',
    bottom: 16,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default InstructorListItem;
