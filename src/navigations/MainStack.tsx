import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContentTab from '@navigations/ContentTab';
import {LoggedInParamList} from '../../AppInner';
import HeaderLeft from '@components/HeaderLeft';
import {WHITE} from '@styles/colors';
import RecruitMapScreen from '@screen/RecruitMapScreen';
import RecruitListScreen from '@screen/RecruitListScreen';
import InstructorListScreen from '@screen/InstructorListScreen';
import ProfileScreen from '@screen/ProfileScreen';

const Stack = createNativeStackNavigator<LoggedInParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '500',
        },
        contentStyle: {backgroundColor: WHITE},
        headerLeft: HeaderLeft,
      }}>
      <Stack.Screen
        name="ContentTab"
        component={ContentTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecruitMap"
        component={RecruitMapScreen}
        options={{title: '구인'}}
      />
      <Stack.Screen
        name="RecruitList"
        component={RecruitListScreen}
        options={{title: '구인'}}
      />
      <Stack.Screen
        name="InstructorList"
        component={InstructorListScreen}
        options={{title: '강사'}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: '프로필'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
