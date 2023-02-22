import {Dimensions} from 'react-native';
import {BLUE, GRAY} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommunityMyPost from '@components/Community/CommunityMyPost';
import CommunityMyBookmark from '@components/Community/CommunityMyBookmark';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

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
          tabBarIndicatorStyle: {
            width: tabWidth,
            marginLeft: 16,
          },
          tabBarStyle: {
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
          },
        }}>
        <Tab.Screen name="작성 내역" component={CommunityMyPost} />
        <Tab.Screen name="북마크" component={CommunityMyBookmark} />
      </Tab.Navigator>
    </>
  );
}

export default function () {
  return <Tabs />;
}
