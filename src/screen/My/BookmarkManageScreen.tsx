import {Dimensions, StyleSheet, View} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BookmarkJobOfferComponent from '@components/My/BookmarkJobOfferComponent';
import BookmarkCommunityComponent from '@components/My/BookmarkCommunityComponent';
import common from '@styles/common';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

const First = () => {
  const LINKS = [
    {
      num: 1,
      position: '요가',
      company: '신바람요가',
      area: '신림',
      src: require('../../assets/images/sample_01.png'),
    },
    {
      num: 2,
      position: '필라테스',
      company: '어느날테스',
      area: '강남',
      src: require('../../assets/images/sample_01.png'),
    },
    {
      num: 3,
      position: '필라요가',
      company: '요를레이',
      area: '역삼',
      src: require('../../assets/images/sample_01.png'),
    },
    {
      num: 4,
      position: '요가파이어',
      company: '달심',
      area: '인도',
      src: require('../../assets/images/sample_01.png'),
    },
  ];
  return (
    <View style={[styles.container, common.pt16]}>
      <BookmarkJobOfferComponent data={LINKS} />
    </View>
  );
};

function Second() {
  return (
    <View style={styles.container}>
      <BookmarkCommunityComponent />
    </View>
  );
}

function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
          tabBarActiveTintColor: BLUE.DEFAULT,
          tabBarInactiveTintColor: GRAY.DEFAULT,
          tabBarItemStyle: {width: tabWidth},
          tabBarContentContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIndicatorStyle: {width: tabWidth, marginLeft: 16},
          tabBarStyle: {
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
          },
        }}>
        <Tab.Screen name="구인공고" component={First} />
        <Tab.Screen name="커뮤니티" component={Second} />
      </Tab.Navigator>
    </>
  );
}

export default function () {
  return <Tabs />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: WHITE,
    height: '100%',
  },
});
