import {FlatList, StyleSheet, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import LinkTop from '@components/LinkTop';
import InstructorListItem from '@components/InstructorListItem';

function Link() {
  const INSTRUCTORS = [
    {
      position: '필라테스',
      career: '3년',
      nickname: '사오정',
      certification: true,
      area: '서울 · 송파구 · 신천동',
      hit: 23,
    },
    {
      position: '요가',
      career: '32년',
      nickname: '그램마',
      certification: true,
      area: '서울 · 송파구 · 지옥동',
      hit: 444,
    },
    {
      position: '태권',
      career: '1년',
      nickname: '박병장',
      certification: false,
      area: '서울 · 종로구 · 신길동',
      hit: 36,
    },
    {
      position: '태권',
      career: '1년',
      nickname: '박병장',
      certification: true,
      area: '서울 · 종로구 · 신길동',
      hit: 36,
    },
    {
      position: '태권',
      career: '1년',
      nickname: '박병장',
      certification: false,
      area: '서울 · 종로구 · 신길동',
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
});

export default Link;
