import {SCREEN_WIDTH} from '@/utils/constants/common';
import {fetchRecommendedRecruits} from '@api/recruit';
import RecruitCarousel from '@components/RecruitCarousel';
import toast from '@hooks/toast';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import GradientNaivgationTab from './GradientNavigationTab';

const LinkTop: React.FC = () => {
  const [recruits, setRecruits] = useState<[]>([]);

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
        <GradientNaivgationTab />
      </View>
      <View style={common.mt40}>
        <View style={{marginHorizontal: 16}}>
          <Text style={[common.title]}>추천 채용</Text>
          <Text style={common.text_m}>
            내 주변의 채용중인 센터! 지금 바로 지원해 보세요.
          </Text>
        </View>
        <View style={common.mt16}>
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
};

export default LinkTop;
