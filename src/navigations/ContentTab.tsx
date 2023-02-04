import {useRef} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Link from '@screen/Link';
import CommunityScreen from '@screen/CommunityScreen';
import Message from '@screen/Message';
import My from '@screen/My';
import {LoggedInParamList} from '../../AppInner';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

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
                    <Pressable
                      style={{marginRight: 16}}
                      onPress={() => Alert.alert('click', 'bell test')}>
                      <Image source={iconPath.BELL} style={common.BELL} />
                    </Pressable>
                    <Pressable onPress={() => Alert.alert('click', 'my test')}>
                      <Image source={iconPath.MY} style={common.MY} />
                    </Pressable>
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
          component={Message}
          options={{
            title: '쪽지',
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
          component={My}
          options={{
            title: 'My',
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
