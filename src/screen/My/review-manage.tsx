import EmployeeReviewTab from '@/components/My/EmployeeReviewTab';
import EmployerReviewTab from '@/components/My/EmployerReviewTab';
import { materialTopTabNavigationOptions } from '@/utils/options/tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export const ReviewManageScreen = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="구직" component={EmployeeReviewTab} />
      <Tab.Screen name="구인" component={EmployerReviewTab} />
    </Tab.Navigator>
  );
};
