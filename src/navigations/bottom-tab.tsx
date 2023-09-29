import { MyCenterScreen } from '@/screen/my-center.screen';
import { CommunityTab } from '@/screen/tab/community-tab.screen';
import { LinkTab } from '@/screen/tab/link-tab.screen';
import { MessageTab } from '@/screen/tab/message-tab.screen';
import { MyTab } from '@/screen/tab/my-tab.screen';
import { useAppSelector } from '@/store';
import { IS_ANDROID, SCREEN_WIDTH } from '@/utils/constants/common';
import { MEMBER_TYPE } from '@/utils/constants/enum';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import { bottomTabNavigationOptions } from '@/utils/options/tab';
import LinkHeader from '@components/Header/LinkHeader';
import MyHeader from '@components/Header/MyHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import common from '@styles/common';
import { useRef } from 'react';
import { Animated, Image } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

const Tab = createBottomTabNavigator<LoggedInParamList>();

export const BottomTab = () => {
  const memberInfo = useAppSelector((state) => state.user);

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const width = SCREEN_WIDTH / 4;

  return (
    <>
      <Tab.Navigator initialRouteName={ROUTE.TAB.LINK} screenOptions={bottomTabNavigationOptions}>
        <Tab.Screen
          name={ROUTE.TAB.LINK}
          component={LinkTab}
          options={{
            title: '채용',
            headerTitle: () => <LinkHeader />,
            headerLeft: () => null,
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? iconPath.TAB_BAR_ICON_1_ON : iconPath.TAB_BAR_ICON_1}
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
          name={ROUTE.TAB.COMMUNITY}
          component={CommunityTab}
          options={{
            title: '커뮤니티',
            headerTitle: () => <LinkHeader toCommunityMy />,
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? iconPath.TAB_BAR_ICON_2_ON : iconPath.TAB_BAR_ICON_2}
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
          name={ROUTE.TAB.MESSAGE}
          component={MessageTab}
          options={{
            title: '쪽지',
            headerTitle: () => <LinkHeader />,
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? iconPath.TAB_BAR_ICON_3_ON : iconPath.TAB_BAR_ICON_3}
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
        {memberInfo.type !== MEMBER_TYPE.COMPANY ? (
          <Tab.Screen
            name={ROUTE.TAB.MY}
            component={MyTab}
            options={{
              title: 'MY',
              headerTitleAlign: 'left',
              headerTitle: () => <MyHeader link={'MyNotification'} />,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={focused ? iconPath.TAB_BAR_ICON_4_ON : iconPath.TAB_BAR_ICON_4}
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
            name="MyCenter"
            component={MyCenterScreen}
            options={{
              title: 'MY',
              headerTitleAlign: 'left',
              headerTitle: () => <MyHeader link={'MyNotification'} />,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={focused ? iconPath.TAB_BAR_ICON_4_ON : iconPath.TAB_BAR_ICON_4}
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
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </>
  );
};
