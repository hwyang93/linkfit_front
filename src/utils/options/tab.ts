import {BLUE, GRAY} from '@/styles/colors';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs';
import {SCREEN_WIDTH} from '../constants/common';

const tabWidth = (SCREEN_WIDTH - 32) / 2;

export const materialTopTabNavigationOptions: MaterialTopTabNavigationOptions =
  {
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
      backgroundColor: BLUE.DEFAULT,
    },
    tabBarStyle: {
      elevation: 0, // for Android
      shadowOffset: {
        width: 0,
        height: 0, // for iOS
      },
    },
  };
