import FollowingCenterTab from '@/components/My/FollowingCenterTab';
import FollowingInstructorTab from '@/components/My/FollowingInstructorTab';
import { materialTopTabNavigationOptions } from '@/utils/options/tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export const FollowingManageScreen = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="센터" component={FollowingCenterTab} />
      <Tab.Screen name="강사" component={FollowingInstructorTab} />
    </Tab.Navigator>
  );
};
