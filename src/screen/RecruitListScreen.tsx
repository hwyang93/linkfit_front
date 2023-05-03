import {Alert, StyleSheet} from 'react-native';
import {iconPath} from '@util/iconPath';
import RecruitComponent from '@components/RecruitComponent';
import FloatingLinkButton from '@components/FloatingLinkButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCallback, useEffect, useState} from 'react';
import {fetchRecruits} from '@api/recruit';
import FloatingWriteButton from '@components/FloatingWriteButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import toast from '@hooks/toast';

function RecruitListScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [recruits, setRecruits] = useState<any[]>([]);

  const getRecruits = useCallback(() => {
    const params = {};
    fetchRecruits(params)
      .then(({data}: any) => {
        setRecruits(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    getRecruits();
  }, [getRecruits]);

  const toJobOfferForm = () => {
    navigation.navigate('JobOfferForm');
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* 구인공고 */}
      <RecruitComponent
        list={recruits}
        title={'구인 공고'}
        text={'내 주변의 구인 공고를 만나보세요!'}
      />
      {/* Floating Button */}
      <FloatingWriteButton
        bottom={88}
        icon={iconPath.PENCIL_W}
        job={toJobOfferForm}
      />
      {/* 페이지 이동 버튼 */}
      <FloatingLinkButton
        link={'RecruitMap'}
        title={'지도보기'}
        icon={iconPath.MAP}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default RecruitListScreen;
