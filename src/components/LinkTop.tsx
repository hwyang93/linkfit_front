import { LoggedInParamList } from '@/../AppInner';
import RecruitListItem from '@/components/Compound/RecruitListItem';
import { useRecommendedRecruitList } from '@/hooks/recruit/use-recommended-recruit-list';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import common from '@styles/common';
import { FlatList, Text, View } from 'react-native';
import GradientNaivgationTab from './GradientNavigationTab';

const LinkTop: React.FC = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const { data } = useRecommendedRecruitList();

  return (
    <View style={{ marginTop: 32 }}>
      <View style={{ marginHorizontal: 16 }}>
        <GradientNaivgationTab />
      </View>
      <View style={common.mt40}>
        <View style={{ marginHorizontal: 16 }}>
          <Text style={common.title}>추천 채용</Text>
          <Text style={common.text_m}>내 주변의 채용중인 센터! 지금 바로 지원해 보세요.</Text>
        </View>
        <View style={common.mt16}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 16 }}
            keyExtractor={(_, index) => index.toString()}
            data={data}
            horizontal
            renderItem={({ item }) => (
              <RecruitListItem
                seq={item.seq}
                title={item.title}
                position={item.position}
                companyName={item.companyName}
                address={item.address}
                bookmarkChecked={item.isBookmark === 'Y'}
                imageSrc={item.writer?.profileImage?.originFileUrl}
                onPress={() => navigation.navigate('JobPost', { recruitSeq: item.seq })}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={[common.mt40, { marginHorizontal: 16 }]}>
        <Text style={common.title}>추천 강사</Text>
        <Text style={common.text_m}>능력있는 강사들을 지금 바로 만나보세요!</Text>
      </View>
    </View>
  );
};

export default LinkTop;
