import { materialTopTabNavigationOptions } from '@/lib/options/tab';
import BlockCenterComponent from '@components/My/BlockCenterComponent';
import BlockInstructorComponent from '@components/My/BlockInstructorComponent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WHITE } from '@styles/colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const BlockCenterTab: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <BlockCenterComponent />
    </SafeAreaView>
  );
};

const BlockInstructorTab: React.FC = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <BlockInstructorComponent />
    </SafeAreaView>
  );
};

export const BlacklistScreen = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="센터" component={BlockCenterTab} />
      <Tab.Screen name="강사" component={BlockInstructorTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
