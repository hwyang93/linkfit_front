import {Dimensions, StyleSheet} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EmployerReviewComponent from '@components/My/EmployerReviewComponent';
import EmployeeReviewComponent from '@components/My/EmployeeReviewComponent';

// todo : 케밥 버튼 클릭 시 모달 띄우기
// todo : 후기 등록 페이지 ReviewFormScreen.tsx

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

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
          tabBarStyle: {
            elevation: 0, // for Android
            shadowOffset: {
              width: 0,
              height: 0, // for iOS
            },
          },
        }}>
        <Tab.Screen name="구직" component={EmployeeReviewComponent} />
        <Tab.Screen name="구인" component={EmployerReviewComponent} />
      </Tab.Navigator>
    </>
  );
}

export default function () {
  return <Tabs />;
}
