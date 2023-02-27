import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE} from '@styles/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

type ListProps = {
  item: {
    seq: number;
    field: string;
    career: string;
    nickname: string;
    address: string;
    followerCount: number;
  };
};

// todo: 필라테스 요가에 따라 썸넹일 이미지 변경되게 세팅 해야함(참고 ProfileScreen.tsx)

function InstructorListItem({item}: ListProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <View style={styles.listBox}>
      <Pressable
        style={common.mr16}
        onPress={() => navigation.navigate('Profile', {memberSeq: item.seq})}>
        <Image
          source={require('../assets/images/thumbnail.png')}
          style={styles.thumbnail}
        />
      </Pressable>
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {item.field}
          </Text>
          <Text style={[common.text]}>{item.career}</Text>
        </View>

        <View style={common.rowCenter}>
          <Text style={[common.title, common.mr8]}>{item.nickname}</Text>
          <View style={common.rowCenter}>
            <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>인증강사</Text>
            <Image
              style={{marginLeft: 2, width: 14, height: 14}}
              source={iconPath.CERTIFICATION}
            />
          </View>
        </View>
        <Text style={[common.text_s, common.fcg]}>{item.address}</Text>
      </View>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={() => Alert.alert('click', 'test')}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
      <View style={styles.rightBox}>
        <Pressable onPress={() => Alert.alert('click', 'test')}>
          <Image
            source={iconPath.MESSAGE}
            style={[common.size24, common.mr8]}
          />
        </Pressable>
        <Pressable onPress={() => Alert.alert('click', 'test')}>
          <Image
            source={iconPath.FAVORITE}
            style={[common.size24, common.mr8]}
          />
        </Pressable>
        <Text style={[common.text_m, common.fwb]}>{item.followerCount}</Text>
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
