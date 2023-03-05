import {Dimensions, StyleSheet, View} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowingCenterComponent from '@components/My/FollowingCenterComponent';
import FollowingInstructorComponent from '@components/My/FollowingInstructorComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

const First = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FollowingCenterComponent />
    </SafeAreaView>
  );
};

function Second() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FollowingInstructorComponent />
    </SafeAreaView>
  );
}

function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
          tabBarActiveTintColor: BLUE.DEFAULT,
          tabBarInactiveTintColor: GRAY.DEFAULT,
          tabBarItemStyle: {
            width: tabWidth,
          },
          tabBarContentContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIndicatorStyle: {width: tabWidth, marginLeft: 16},
          tabBarStyle: {
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
          },
        }}>
        <Tab.Screen name="센터" component={First} />
        <Tab.Screen name="강사" component={Second} />
      </Tab.Navigator>
    </>
  );
}

export default function () {
  return <Tabs />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: WHITE,
    height: '100%',
  },
});
