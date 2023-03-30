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
import toast from '@hooks/toast';
import {fetchCompany} from '@api/company';

// const HEADER_HEIGHT = 250;

const width = Dimensions.get('window').width - 32;
const tabWidth = width / 2;
const imageSize = (width - 6) / 3;
type headerProps = {
  centerInfo: any;
  recruits: any[];
};
// 센터 프로필 상단 영역 시작
function Header({centerInfo, recruits}: headerProps) {
  return <CenterInfoTop centerInfo={centerInfo} recruits={recruits} />;
}
// 센터 프로필 상단 영역 끝

function CenterInfoScreen() {
  const route = useRoute<RouteProp<LoggedInParamList, 'CenterInfo'>>();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [centerInfo, setCenterInfo] = useState<any>({});
  const [recruits, setRecruits] = useState<any[]>([]);
  const [reputations, setReputations] = useState<any[]>([]);

  const getCenterInfo = useCallback(() => {
    fetchCompany(route.params.memberSeq)
      .then(({data}: any) => {
        setCenterInfo(data.companyInfo);
        setRecruits(data.recruits);
        setReputations(data.reputations);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [route.params.memberSeq]);

  useEffect(() => {
    getCenterInfo();
  }, [getCenterInfo]);
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
        <Text style={common.text_m}>
          {`${centerInfo.address} ${centerInfo.addressDetail}`}
        </Text>
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

  const ReviewTab = useCallback(
    ({item}: any) => {
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
              {item.evaluationMember?.nickname
                ? item.evaluationMember?.nickname
                : item.evaluationMember?.name}
            </Text>
            <Text
              style={[
                common.text,
                {alignSelf: 'flex-end', marginHorizontal: 4},
              ]}>
              {item.evaluationMember?.field}
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              {item.updatedAt}
            </Text>
          </View>
          <Pressable onPress={textExpansion}>
            <Text style={common.text_m} numberOfLines={textLine}>
              {item.comment}
            </Text>
          </Pressable>
        </View>
      );
    },
    [textLine],
  );

  return (
    <Tabs.Container
      renderHeader={() => (
        <Header centerInfo={centerInfo} recruits={recruits} />
      )}
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
            ListHeaderComponent={() => <IntroduceTabHeader />}
            ListFooterComponent={() => <IntroduceTabFooter />}
            renderItem={IntroduceTab}
            numColumns={3}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
      <Tabs.Tab name="후기 관리">
        <View style={{padding: 16}}>
          <Tabs.FlatList
            data={reputations}
            ListHeaderComponent={<View style={{paddingBottom: 16}} />}
            ItemSeparatorComponent={() => {
              return (
                <View style={[common.separator, common.mv16, {width: width}]} />
              );
            }}
            renderItem={ReviewTab}
            keyExtractor={(item: any) => item.seq}
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
