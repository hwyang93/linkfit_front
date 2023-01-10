import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Link from '../screen/Link';
import Community from '../screen/Community';
import Message from '../screen/Message';
import My from '../screen/My';
import * as React from 'react';
import {LoggedInParamList} from '../../AppInner';
import {Animated, Dimensions, Image, Platform, View} from 'react-native';
import {useEffect, useRef} from 'react';
import {fetchMember, fetchMemberInfo} from '../api/member';
import common from '../styles/common';
import {iconPath} from '../util/iconPath';

const Tab = createBottomTabNavigator<LoggedInParamList>();

const MainStack = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  function getWidth() {
    let width = Dimensions.get('window').width;
    // width = width ;
    return width / 4;
  }

  // useEffect(() => {
  //   getSomething().then(r => {
  //     console.log('무엇이 있나 ', r);
  //   });
  // }, []);
  // const getSomething = async () => {
  //   const response = await fetchMemberInfo(1);
  //   console.log('get ', response);
  // };
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '500',
          },
          tabBarStyle: {
            height: Platform.OS === 'android' ? 80 : 100,
            backgroundColor: '#fff',
            paddingVertical: 16,
          },
          tabBarLabelStyle: {fontSize: 16, marginVertical: 10},
          tabBarAllowFontScaling: true,
        }}>
        <Tab.Screen
          name="Link"
          component={Link}
          options={{
            title: '링크',
            headerTitle: () => {
              return (
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 0}}>
                    <Image
                      source={iconPath.LOGO}
                      style={{width: 116, height: 32}}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{marginRight: 24}}>
                      <Image source={iconPath.BELL} style={common.BELL} />
                    </View>
                    <View>
                      <Image source={iconPath.MY} style={common.MY} />
                    </View>
                  </View>
                </View>
              );
            },
            headerLeft: () => {
              return null;
            },
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_1_ON : iconPath.TAB_BAR_ICON_1
                }
                style={common.TAB_BAR_ICON}
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
          component={Community}
          options={{
            title: '커뮤니티',
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_2_ON : iconPath.TAB_BAR_ICON_2
                }
                style={common.TAB_BAR_ICON}
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
          component={Message}
          options={{
            title: '쪽지',
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_3_ON : iconPath.TAB_BAR_ICON_3
                }
                style={common.TAB_BAR_ICON}
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
          component={My}
          options={{
            title: 'My',
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? iconPath.TAB_BAR_ICON_4_ON : iconPath.TAB_BAR_ICON_4
                }
                style={common.TAB_BAR_ICON}
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

export default MainStack;
