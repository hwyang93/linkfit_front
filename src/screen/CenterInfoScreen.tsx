import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import CenterInfoTop from '@components/CenterInfoTop';
import {fetchMemberInfoBySeq, fetchRecruitByMember} from '@api/member';
import toast from '@hooks/toast';

// const HEADER_HEIGHT = 250;

const width = Dimensions.get('window').width - 32;
const tabWidth = width / 2;
const imageSize = (width - 6) / 3;

// 센터 프로필 상단 영역 시작
function Header() {
  const [centerInfo, setCenterInfo] = useState<any>({});
  const [recruits, setRecruits] = useState<any[]>([]);
  const route = useRoute<RouteProp<LoggedInParamList, 'CenterInfo'>>();
  const getCenterInfo = useCallback(() => {
    fetchMemberInfoBySeq(route.params.memberSeq)
      .then(({data}: any) => {
        console.log(data);
        setCenterInfo(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [route.params.memberSeq]);

  const getRecruits = useCallback(() => {
    fetchRecruitByMember(route.params.memberSeq)
      .then(({data}: any) => {
        console.log(data);
        setRecruits(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [route.params.memberSeq]);

  useEffect(() => {
    getCenterInfo();
    getRecruits();
  }, [getCenterInfo, getRecruits]);
  return <CenterInfoTop centerInfo={centerInfo} recruits={recruits} />;
}
// 센터 프로필 상단 영역 끝

function CenterInfoScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  // 탭 바 영역
  const tabBar = (props: any) => (
    <MaterialTabBar
      {...props}
      style={styles.tab}
      inactiveColor={GRAY.DEFAULT}
      indicatorStyle={styles.indicator}
      activeColor={BLUE.DEFAULT}
      itemStyle={{width: tabWidth}}
      labelStyle={common.text_m}
      contentContainerStyle={{
        flex: 1,
        width: width,
      }}
    />
  );

  const IntroduceTabHeader = () => {
    return (
      <View style={common.mb8}>
        <Text style={[common.text_m, common.fwb]}>센터 사진</Text>
      </View>
    );
  };
  const IntroduceTabFooter = () => {
    return (
      <View style={common.mt16}>
        <Text style={[common.text_m, common.fwb]}>센터 주소</Text>
        <Text style={common.text_m}>서울특별시 강남구 봉은사로 12345</Text>
      </View>
    );
  };

  const tab1Data = [
    {src: require('@images/center_01.png')},
    {src: require('@images/center_02.png')},
    {src: require('@images/center_03.png')},
    {src: require('@images/center_04.png')},
    {src: require('@images/center_05.png')},
  ];

  type imageProps = {
    item: any;
  };

  const IntroduceTab = useCallback(
    ({item}: imageProps) => {
      return (
        <>
          <Pressable onPress={() => navigation.navigate('Gallery')}>
            <Image
              source={item.src}
              resizeMode={'cover'}
              style={{
                width: imageSize,
                height: imageSize,
                margin: 1,
              }}
            />
          </Pressable>
        </>
      );
    },
    [navigation],
  );

  type reviewProps = {
    item: {
      id: number;
      nickname: string;
      type: string;
      date: string;
      review: string;
    };
  };

  const [textLine, setTextLine] = useState(2);
  const tab2Data = [
    {
      id: 1,
      nickname: '저팔계',
      type: '강사',
      date: '2022.12.12',
      review:
        '후기 내용 입니다. 저팔계지만 유연해요. 깜짝 놀랐어요. 오늘 점심은 뭐 먹을까요. 매일매일 고민해요. 왜 때문이죠.',
    },
    {
      id: 2,
      nickname: '소다늠',
      type: '강사',
      date: '2023.1.12',
      review: '젓가락이지만 유연해요. 깜짝 놀랐어요.',
    },
  ];

  const ReviewTab = useCallback(
    ({item}: reviewProps) => {
      const textExpansion = () => {
        if (textLine === 2) {
          setTextLine(0);
        } else {
          setTextLine(2);
        }
      };
      return (
        <View
          style={{
            width: width,
            // padding: 16,
          }}>
          <View style={[common.row, common.mb8]}>
            <Text style={[common.text_m, common.fwb, common.fs18]}>
              {item.nickname}
            </Text>
            <Text
              style={[
                common.text,
                {alignSelf: 'flex-end', marginHorizontal: 4},
              ]}>
              {item.type}
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              {item.date}
            </Text>
          </View>
          <Pressable onPress={textExpansion}>
            <Text style={common.text_m} numberOfLines={textLine}>
              {item.review}
            </Text>
          </Pressable>
        </View>
      );
    },
    [textLine],
  );

  return (
    <Tabs.Container
      renderHeader={Header}
      allowHeaderOverscroll
      revealHeaderOnScroll
      headerContainerStyle={{
        paddingTop: 16,
        paddingHorizontal: 16,
        shadowOpacity: 0,
        elevation: 0,
      }}
      // headerHeight={HEADER_HEIGHT}
      renderTabBar={tabBar}>
      <Tabs.Tab name="센터 소개">
        <View style={{padding: 16}}>
          <Tabs.FlatList
            data={tab1Data}
            ListHeaderComponent={IntroduceTabHeader}
            ListFooterComponent={IntroduceTabFooter}
            renderItem={IntroduceTab}
            numColumns={3}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
      <Tabs.Tab name="후기 관리">
        <View style={{padding: 16}}>
          <Tabs.FlatList
            data={tab2Data}
            ListHeaderComponent={<View style={{paddingBottom: 16}} />}
            ItemSeparatorComponent={() => {
              return (
                <View style={[common.separator, common.mv16, {width: width}]} />
              );
            }}
            renderItem={ReviewTab}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  pencil: {position: 'absolute', top: 0, right: 0},
  tab: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  indicator: {
    width: tabWidth,
    backgroundColor: BLUE.DEFAULT,
  },
});

export default CenterInfoScreen;
