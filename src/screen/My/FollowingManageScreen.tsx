import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import FollowingCenterComponent from '@components/My/FollowingCenterComponent';
import FollowingInstructorComponent from '@components/My/FollowingInstructorComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WHITE} from '@styles/colors';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const CenterTab: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FollowingCenterComponent />
    </SafeAreaView>
  );
};

const InstructorTab: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FollowingInstructorComponent />
    </SafeAreaView>
  );
};

const FollowingManageScreen: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="센터" component={CenterTab} />
      <Tab.Screen name="강사" component={InstructorTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: WHITE,
    height: '100%',
  },
});

export default FollowingManageScreen;
