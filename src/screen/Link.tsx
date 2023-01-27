import {
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import LinkTop from '@components/LinkTop';
import InstructorListItem from '@components/InstructorListItem';
import {iconPath} from '@util/iconPath';

function Link() {
  const INSTRUCTORS = [
    {
      field: '필라테스',
      career: '3년',
      nickname: '사오정',
      certification: true,
      address: '서울 · 송파구 · 신천동',
      hit: 23,
    },
    {
      field: '요가',
      career: '32년',
      nickname: '그램마',
      certification: true,
      address: '서울 · 송파구 · 지옥동',
      hit: 444,
    },
    {
      field: '태권',
      career: '1년',
      nickname: '박병장',
      certification: false,
      address: '서울 · 종로구 · 신길동',
      hit: 36,
    },
    {
      field: '태권',
      career: '1년',
      nickname: '박병장',
      certification: true,
      address: '서울 · 종로구 · 신길동',
      hit: 36,
    },
    {
      field: '태권',
      career: '1년',
      nickname: '박병장',
      certification: false,
      address: '서울 · 종로구 · 신길동',
      hit: 36,
    },
  ];

  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={INSTRUCTORS}
        renderItem={renderItem}
        ListHeaderComponent={<LinkTop />}
        ItemSeparatorComponent={() => <View style={common.separator} />}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => Alert.alert('click', 'test')}>
        <Image source={iconPath.PENCIL_B} style={common.PENCIL_B} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: WHITE,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: WHITE,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {elevation: 3},
    }),
    borderRadius: 20,
  },
});

export default Link;
