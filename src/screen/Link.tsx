import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import RecruitCarousel from '@components/RecruitCarousel';
import InstructorComponent from '@components/InstructorComponent';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

function Link() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const LINKS = [
    {
      num: 1,
      position: '요가',
      company: '신바람요가',
      area: '신림',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 2,
      position: '필라테스',
      company: '어느날테스',
      area: '강남',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 3,
      position: '필라요가',
      company: '요를레이',
      area: '역삼',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 4,
      position: '요가파이어',
      company: '달심',
      area: '인도',
      src: require('../assets/images/sample_01.png'),
    },
  ];
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

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <ScrollView nestedScrollEnabled={true} style={{backgroundColor: WHITE}}>
      <View style={styles.container}>
        <View>
          <LinearGradient
            style={[styles.tabBox]}
            start={{x: 0.1, y: 0.5}}
            end={{x: 0.6, y: 1}}
            colors={['#74ebe4', '#3962f3']}>
            <Pressable
              style={styles.tabItem}
              onPress={() => navigation.navigate('RecruitMap')}>
              <Text style={[common.text_m, common.fwb, {color: WHITE}]}>
                구인
              </Text>
            </Pressable>
            <Pressable
              style={styles.tabItem}
              onPress={() => navigation.navigate('InstructorList')}>
              <Text style={[common.text_m, common.fwb, {color: WHITE}]}>
                강사
              </Text>
            </Pressable>
            <View style={styles.centerLine} />
          </LinearGradient>
        </View>
        {/* 채용 슬라이더 영역 */}
        <View style={common.mt40}>
          <Text style={[common.title]}>추천 채용</Text>
          <Text style={common.text_m}>
            내 주변의 채용중인 센터! 지금 바로 지원해 보세요.
          </Text>

          <View style={common.mt16}>
            {/* 슬라이드 아이템 */}
            <RecruitCarousel
              gap={16}
              offset={0}
              links={LINKS}
              pageWidth={screenWidth - (16 + 36) * 2}
            />
          </View>
        </View>
        {/*  추천 강사 영역 */}
        <View style={common.mt40}>
          {/* 강사 리스트 */}
          <InstructorComponent
            list={INSTRUCTORS}
            title={'추천 강사'}
            text={'능력있는 강사들을 지금 바로 만나보세요!'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 8,
  },
  tabItem: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    position: 'absolute',
    top: 12,
    height: 24,
    width: 1,
    backgroundColor: WHITE,
  },
});

export default Link;
