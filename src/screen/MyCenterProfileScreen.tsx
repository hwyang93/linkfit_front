import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

// const HEADER_HEIGHT = 250;

const width = Dimensions.get('window').width - 32;
const tabWidth = width / 2;
const imageSize = (width - 6) / 3;

// 센터 프로필 상단 영역 시작
const Header = () => {
  return (
    <View>
      <View style={common.mb16}>
        <Image
          source={require('../assets/images/center_01.png')}
          resizeMode={'cover'}
          style={common.imgBox}
        />
      </View>
      <View style={[common.rowBetween, common.mb8]}>
        <View style={common.rowCenter}>
          <Text style={[common.title_l, common.mr8]}>링크 필라테스</Text>
          <Image
            source={iconPath.FAVORITE_FILL}
            style={[common.size24, common.mr4]}
          />
          <Text style={[common.text_m, common.fwb]}>23</Text>
        </View>
        <Pressable
          style={styles.pencil}
          onPress={() => Alert.alert('click', '연필')}>
          <Image source={iconPath.PENCIL_B} style={[common.size24]} />
        </Pressable>
      </View>
      <View style={[common.rowCenter, common.mb16]}>
        <Text style={[common.text_m, common.fwb]}>필라테스</Text>
        <Text style={[common.mh8, common.fcg]}>|</Text>
        <Text style={[common.text_s, {color: GRAY.DARK}]}>서울 · 송파구</Text>
      </View>
      <View style={common.mb16}>
        <Text style={[common.text_m, common.fwb]}>소개글</Text>
        <Text style={common.text_m}>
          강남구 역삼동에 위치한 필라테스 센터입니다.
        </Text>
      </View>
    </View>
  );
};
// 센터 프로필 상단 영역 끝

function MyCenterProfileScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const tab1Data = [
    {src: require('../assets/images/center_01.png')},
    {src: require('../assets/images/center_02.png')},
    {src: require('../assets/images/center_03.png')},
    {src: require('../assets/images/center_04.png')},
    {src: require('../assets/images/center_05.png')},
  ];
  const tab2Data = [
    {
      id: 1,
      nickname: '저팔계',
      type: '강사',
      date: '2022.12.12',
      review: '후기 내용 입니다. 저팔계지만 유연해요. 깜짝 놀랐어요.',
    },
    {
      id: 2,
      nickname: '소다늠',
      type: '강사',
      date: '2023.1.12',
      review: '젓가락이지만 유연해요. 깜짝 놀랐어요.',
    },
  ];

  const IntroduceTabHeader = () => {
    return (
      <View style={common.mb8}>
        <Text style={[common.text_m, common.fwb]}>센터 사진</Text>
      </View>
    );
  };

  // 탭 바 영역
  const tabBar = (props: any) => (
    <MaterialTabBar
      {...props}
      style={{backgroundColor: WHITE}}
      inactiveColor={GRAY.DEFAULT}
      activeColor={BLUE.DEFAULT}
      labelStyle={{fontSize: 16, fontWeight: '700'}}
      tabContainerStyle={{
        width: tabWidth,
        elevation: 0, // for Android
        shadowOffset: {
          width: 0,
          height: 0, // for iOS
        },
      }}
      contentContainerStyle={{
        width: width,
        elevation: 0, // for Android
        shadowOffset: {
          width: 0,
          height: 0, // for iOS
        },
      }}
    />
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

  return (
    <Tabs.Container
      renderHeader={Header}
      headerContainerStyle={{
        paddingHorizontal: 16,
        shadowOpacity: 0,
      }}
      // headerHeight={HEADER_HEIGHT}
      renderTabBar={tabBar}>
      <Tabs.Tab name="센터 소개">
        <View style={{padding: 16}}>
          <Tabs.FlatList
            data={tab1Data}
            ListHeaderComponent={IntroduceTabHeader}
            renderItem={(item: any) => {
              console.log('이미지가', item);
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
                        backgroundColor: 'red',
                      }}
                    />
                  </Pressable>
                </>
              );
            }}
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
            renderItem={({item}: reviewProps) => {
              return (
                <View
                  style={{
                    width: width,
                  }}>
                  <View style={{flexDirection: 'row'}}>
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
                  <Text style={common.text_m} numberOfLines={2}>
                    {item.review}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  pencil: {position: 'absolute', top: 0, right: 0},
});

export default MyCenterProfileScreen;
