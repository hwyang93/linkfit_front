import {Dimensions, Text, View} from 'react-native';
import common from '@styles/common';
import PostCarousel from '@components/PostCarousel';

function CommunityTop() {
  const screenWidth = Dimensions.get('window').width;
  const POP = [
    {
      id: 1,
      title: '게시글 제목이 길어 슬픈 짐승',
      companyName: '센터명',
      type: '센터',
      date: '2022.12.12',
    },
    {
      id: 2,
      title: '게시글 제목',
      nickname: '젠틀맨',
      type: '강사',
      date: '2022.12.12',
    },
    {
      id: 3,
      title: '게시글 제목',
      nickname: '뽕뽜이야',
      type: '강사',
      date: '2022.12.12',
    },
    {
      id: 4,
      title: '게시글 제목',
      nickname: '김수완무',
      type: '강사',
      date: '2022.12.12',
    },
  ];

  return (
    <View>
      <View style={common.mv16}>
        <Text style={common.title}>인기 게시글</Text>
      </View>

      <View style={common.mb40}>
        <PostCarousel
          gap={12}
          offset={0}
          links={POP}
          pageWidth={screenWidth - 220}
        />
      </View>

      <View style={common.mb16}>
        <Text style={[common.title]}>추천 게시글</Text>
      </View>
    </View>
  );
}

export default CommunityTop;
