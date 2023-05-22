import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import EmployeeReviewComponent from '@components/My/EmployeeReviewComponent';
import EmployerReviewComponent from '@components/My/EmployerReviewComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ReviewManageScreen: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="구직" component={EmployeeReviewComponent} />
      <Tab.Screen name="구인" component={EmployerReviewComponent} />
    </Tab.Navigator>
  );
};

export default ReviewManageScreen;
