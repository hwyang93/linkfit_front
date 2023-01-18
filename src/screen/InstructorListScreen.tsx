import {StyleSheet, View} from 'react-native';
import InstructorComponent from '@components/InstructorComponent';

function InstructorListScreen() {
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
  return (
    <View style={styles.container}>
      {/*강사 리스트 컴포넌트 */}
      <InstructorComponent
        list={INSTRUCTORS}
        title={'내 주변 강사'}
        text={'링크핏의 우수 강사를 확인하세요.'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
});

export default InstructorListScreen;
