import { BLUE, GRAY } from '@/styles/colors';
import THEME from '@/styles/theme';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { IS_ANDROID } from '../constants/common';

export const materialTopTabNavigationOptions: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: { fontSize: 16, fontWeight: '700' },
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

export const bottomTabNavigationOptions: BottomTabNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: '500',
  },
  tabBarStyle: {
    height: IS_ANDROID ? 80 : 100,
    backgroundColor: THEME.WHITE,
    paddingTop: 20,
  },
  tabBarLabelStyle: { fontSize: 16, marginVertical: 16 },
  tabBarAllowFontScaling: true,
  headerShadowVisible: false,
};
