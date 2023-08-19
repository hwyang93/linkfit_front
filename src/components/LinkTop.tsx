import {LoggedInParamList} from '@/../AppInner';
import RecruitListItem from '@/components/Compound/RecruitListItem';
import {FetchRecommendedRecruitsResponse} from '@/types/api/recruit';
import {fetchRecommendedRecruits} from '@api/recruit';
import toast from '@hooks/toast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import GradientNaivgationTab from './GradientNavigationTab';

const LinkTop: React.FC = () => {
  const [recruits, setRecruits] = useState<FetchRecommendedRecruitsResponse>(
    [],
  );

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

  const renderItem = ({item}: any) => {
    return (
      <RecruitListItem
        seq={item.seq}
        title={item.title}
        position={item.position}
        companyName={item.companyName}
        address={item.address}
        bookmarkChecked={item.isBookmark === 'Y'}
        imageSrc={item.writer?.profileImage?.originFileUrl}
        onPress={() => navigation.navigate('JobPost', {recruitSeq: item.seq})}
      />
    );
  };

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
          <FlatList
            contentContainerStyle={{paddingHorizontal: 16}}
            keyExtractor={(_, index) => index.toString()}
            data={recruits}
            horizontal
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
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
