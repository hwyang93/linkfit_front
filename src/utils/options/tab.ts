import {BLUE, GRAY} from '@/styles/colors';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs';

export const materialTopTabNavigationOptions: MaterialTopTabNavigationOptions =
  {
    tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
    tabBarActiveTintColor: BLUE.DEFAULT,
    tabBarInactiveTintColor: GRAY.DEFAULT,
    tabBarIndicatorStyle: {
      backgroundColor: BLUE.DEFAULT,
    },
    tabBarStyle: {
      marginHorizontal: 16,
      elevation: 0, // for Android
      shadowOffset: {
        width: 0,
        height: 0, // for iOS
      },
    },
  };
