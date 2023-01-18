import {StyleSheet, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import RecruitComponent from '@components/RecruitComponent';
import FloatingLinkButton from '@components/FloatingLinkButton';

function RecruitListScreen() {
  const LINKS = [
    {
      num: 1,
      position: '요가',
      title: '나랏말싸미 듕국에 달아 아주달아',
      company: '신바람요가',
      area: '신림',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 2,
      position: '필라테스',
      title: '믿음소망사랑 그중에 최고는 망사',
      company: '어느날테스',
      area: '강남',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 3,
      position: '필라요가',
      title: '서울말 했던 니가 나를 떠나 버렸어',
      company: '요를레이',
      area: '역삼',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 4,
      position: '요가파이어',
      title: '그대 내게 햄버거 주는 사람',
      company: '달심',
      area: '인도',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 1,
      position: '요가',
      title: '나랏말싸미 듕국에 달아 아주달아',
      company: '신바람요가',
      area: '신림',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 2,
      position: '필라테스',
      title: '믿음소망사랑 그중에 최고는 망사',
      company: '어느날테스',
      area: '강남',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 3,
      position: '필라요가',
      title: '서울말 했던 니가 나를 떠나 버렸어',
      company: '요를레이',
      area: '역삼',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 4,
      position: '요가파이어',
      title: '그대 내게 햄버거 주는 사람',
      company: '달심',
      area: '인도',
      src: require('../assets/images/sample_01.png'),
    },
  ];
  return (
    <View style={styles.container}>
      {/* 구인공고 */}
      <RecruitComponent
        list={LINKS}
        title={'구인 공고'}
        text={'내 주변의 구인 공고를 만나보세요!'}
      />
      {/* 페이지 이동 버튼 */}
      <FloatingLinkButton
        link={'RecruitMap'}
        title={'지도보기'}
        icon={iconPath.MAP}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default RecruitListScreen;
