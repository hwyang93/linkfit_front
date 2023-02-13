import {Dimensions, StyleSheet, View} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowingCenterComponent from '@components/My/FollowingCenterComponent';
import FollowingInstructorComponent from '@components/My/FollowingInstructorComponent';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

const First = () => {
  return (
    <View style={styles.container}>
      <FollowingCenterComponent />
    </View>
  );
};

function Second() {
  return (
    <View style={styles.container}>
      <FollowingInstructorComponent />
    </View>
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
          tabBarItemStyle: {width: tabWidth},
          tabBarContentContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarIndicatorStyle: {width: tabWidth, marginLeft: 16},
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
