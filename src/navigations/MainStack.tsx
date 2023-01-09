import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Link from '../pages/Link';
import Community from '../pages/Community';
import Message from '../pages/Message';
import My from '../pages/My';
import * as React from 'react';
import {LoggedInParamList} from '../../AppInner';
import {Animated, Dimensions, Image, Platform, View} from 'react-native';
import {useEffect, useRef} from 'react';
import {fetchMember, fetchMemberInfo} from '../api/member';

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
                      source={require('../assets/images/logo.png')}
                      style={{width: 116, height: 32}}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{marginRight: 24}}>
                      <Image
                        source={require('../assets/images/bell.png')}
                        style={{width: 17, height: 21}}
                        resizeMode={'cover'}
                      />
                    </View>
                    <View>
                      <Image
                        source={require('../assets/images/my.png')}
                        style={{width: 16, height: 16}}
                        resizeMode={'cover'}
                      />
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
                  focused
                    ? require('../assets/images/icon/tabBarIcon_1_on.png')
                    : require('../assets/images/icon/tabBarIcon_1.png')
                }
                style={{
                  width: 24,
                  height: 24,
                }}
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
                  focused
                    ? require('../assets/images/icon/tabBarIcon_2_on.png')
                    : require('../assets/images/icon/tabBarIcon_2.png')
                }
                style={{
                  width: 24,
                  height: 24,
                }}
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
                  focused
                    ? require('../assets/images/icon/tabBarIcon_3_on.png')
                    : require('../assets/images/icon/tabBarIcon_3.png')
                }
                style={{
                  width: 24,
                  height: 24,
                }}
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
                  focused
                    ? require('../assets/images/icon/tabBarIcon_4_on.png')
                    : require('../assets/images/icon/tabBarIcon_4.png')
                }
                style={{
                  width: 24,
                  height: 24,
                }}
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
