import {useRef} from 'react';
import {Animated, Dimensions, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Link from '@screen/Link';
import CommunityScreen from '@screen/CommunityScreen';
import MessageScreen from '@screen/MessageScreen';
import MyScreen from '@screen/MyScreen';
import {LoggedInParamList} from '../../AppInner';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import MyHeader from '@components/Header/MyHeader';
import LinkHeader from '@components/Header/LinkHeader';

const Tab = createBottomTabNavigator<LoggedInParamList>();

const ContentTab = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  function getWidth() {
    let width = Dimensions.get('window').width;
    // width = width ;
    return width / 4;
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName={'Link'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '500',
          },
          tabBarStyle: {
            height: Platform.OS === 'android' ? 80 : 100,
            backgroundColor: '#fff',
            paddingTop: 20,
          },
          tabBarLabelStyle: {fontSize: 16, marginVertical: 0},
          tabBarAllowFontScaling: true,
          headerShadowVisible: false,
        }}>
        <Tab.Screen
          name="Link"
          component={Link}
          options={{
            title: '채용',
            headerTitle: () => {
              return <LinkHeader toPush={'MyNotification'} toMy={'My'} />;
            },
            headerLeft: () => {
              return null;
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_1_ON : iconPath.TAB_BAR_ICON_1
                }
                style={common.size24}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            title: '커뮤니티',
            headerTitle: () => {
              return (
                <LinkHeader toPush={'MyNotification'} toMy={'CommunityMy'} />
              );
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_2_ON : iconPath.TAB_BAR_ICON_2
                }
                style={common.size24}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            title: '쪽지',
            headerTitle: () => {
              return <LinkHeader toPush={'MyNotification'} toMy={'My'} />;
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_3_ON : iconPath.TAB_BAR_ICON_3
                }
                style={common.size24}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="My"
          component={MyScreen}
          options={{
            title: 'MY',
            headerTitleAlign: 'left',
            headerTitle: () => {
              return <MyHeader link={'MyNotification'} />;
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_4_ON : iconPath.TAB_BAR_ICON_4
                }
                style={common.size24}
              />
            ),
          }}
          listeners={() => ({
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'android' ? 78 : 98,
          left: 0,
          width: getWidth(),
          height: 2,
          backgroundColor: '#3962f3',
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}
      />
    </>
  );
};

export default ContentTab;
