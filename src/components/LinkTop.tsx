import {SCREEN_WIDTH} from '@/utils/constants/common';
import {fetchRecommendedRecruits} from '@api/recruit';
import RecruitCarousel from '@components/RecruitCarousel';
import toast from '@hooks/toast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LoggedInParamList} from '../../AppInner';

function LinkTop() {
  const [recruits, setRecruits] = useState<[]>([]);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  useEffect(() => {
    fetchRecommendedRecruits()
      .then(({data}) => {
        setRecruits(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, []);

  return (
    <View style={{marginTop: 32}}>
      <View style={{marginHorizontal: 16}}>
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
        <View style={{marginHorizontal: 16}}>
          <Text style={[common.title]}>추천 채용</Text>
          <Text style={common.text_m}>
            내 주변의 채용중인 센터! 지금 바로 지원해 보세요.
          </Text>
        </View>
        <View style={common.mt16}>
          {/* 슬라이드 아이템 */}
          <RecruitCarousel
            gap={8}
            offset={32}
            links={recruits}
            pageWidth={SCREEN_WIDTH - (8 + 32) / 2}
          />
        </View>
      </View>
      <View style={[common.mt40, {marginHorizontal: 16}]}>
        <Text style={[common.title]}>추천 강사</Text>
        <Text style={common.text_m}>
          능력있는 강사들을 지금 바로 만나보세요!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default LinkTop;
