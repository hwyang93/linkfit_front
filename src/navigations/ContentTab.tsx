import {IS_ANDROID, SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {bottomTabNavigationOptions} from '@/utils/options/tab';
import LinkHeader from '@components/Header/LinkHeader';
import MyHeader from '@components/Header/MyHeader';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CommunityScreen from '@screen/CommunityScreen';
import Link from '@screen/Link';
import MessageScreen from '@screen/MessageScreen';
import MyCenterScreen from '@screen/MyCenterScreen';
import MyScreen from '@screen/MyScreen';
import {RootState} from '@store/reducer';
import common from '@styles/common';
import {useRef} from 'react';
import {Animated, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {LoggedInParamList} from '../../AppInner';

const Tab = createBottomTabNavigator<LoggedInParamList>();

const ContentTab = () => {
  const memberInfo = useSelector((state: RootState) => state.user);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const width = SCREEN_WIDTH / 4;

  return (
    <>
      <Tab.Navigator
        initialRouteName="Link"
        screenOptions={bottomTabNavigationOptions}>
        <Tab.Screen
          name="Link"
          component={Link}
          options={{
            title: '채용',
            headerTitle: () => <LinkHeader />,
            headerLeft: () => null,
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
            focus: () => {
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
            headerTitle: () => <LinkHeader toCommunityMy />,
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
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: width,
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
            headerTitle: () => <LinkHeader />,
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
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: width * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        {memberInfo.type !== 'COMPANY' ? (
          <Tab.Screen
            name="My"
            component={MyScreen}
            options={{
              title: 'MY',
              headerTitleAlign: 'left',
              headerTitle: () => <MyHeader link={'MyNotification'} />,
              tabBarIcon: ({focused}) => (
                <Image
                  source={
                    focused
                      ? iconPath.TAB_BAR_ICON_4_ON
                      : iconPath.TAB_BAR_ICON_4
                  }
                  style={common.size24}
                />
              ),
            }}
            listeners={() => ({
              focus: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: width * 3,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
        ) : (
          <Tab.Screen
            name="My"
            component={MyCenterScreen}
            options={{
              title: 'MY',
              headerTitleAlign: 'left',
              headerTitle: () => <MyHeader link={'MyNotification'} />,
              tabBarIcon: ({focused}) => (
                <Image
                  source={
                    focused
                      ? iconPath.TAB_BAR_ICON_4_ON
                      : iconPath.TAB_BAR_ICON_4
                  }
                  style={common.size24}
                />
              ),
            }}
            listeners={() => ({
              focus: () => {
                Animated.spring(tabOffsetValue, {
                  toValue: width * 3,
                  useNativeDriver: true,
                }).start();
              },
            })}
          />
        )}
      </Tab.Navigator>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: IS_ANDROID ? 79 : 99,
          left: 0,
          width: width,
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
