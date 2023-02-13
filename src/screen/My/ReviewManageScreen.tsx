import {Dimensions, StyleSheet, View} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EmployerReviewComponent from '@components/My/EmployerReviewComponent';
import EmployeeReviewComponent from '@components/My/EmployeeReviewComponent';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

const First = () => {
  return (
    <View style={styles.container}>
      <EmployeeReviewComponent />
    </View>
  );
};

function Second() {
  return (
    <View style={styles.container}>
      <EmployerReviewComponent />
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
        <Tab.Screen name="구직" component={First} />
        <Tab.Screen name="구인" component={Second} />
      </Tab.Navigator>
    </>
  );
}

export default function () {
  return <Tabs />;
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE, height: '100%'},
});
