import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContentTab from '@navigations/ContentTab';
import {LoggedInParamList} from '../../AppInner';
import HeaderLeft from '@components/HeaderLeft';
import {WHITE} from '@styles/colors';
import RecruitMapScreen from '@screen/RecruitMapScreen';
import RecruitListScreen from '@screen/RecruitListScreen';
import InstructorListScreen from '@screen/InstructorListScreen';
import ProfileScreen from '@screen/ProfileScreen';
import HeaderRight from '@components/HeaderRight';
import SuggestionScreen from '@screen/SuggestionScreen';
import CenterInfoScreen from '@screen/CenterInfoScreen';
import JobPostScreen from '@screen/JobPostScreen';

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
        headerShadowVisible: false,
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
        options={{title: '프로필', headerRight: HeaderRight}}
      />
      <Stack.Screen
        name="Suggestion"
        component={SuggestionScreen}
        options={{title: '포지션 제안하기'}}
      />
      <Stack.Screen
        name="CenterInfo"
        component={CenterInfoScreen}
        options={{title: '센터 정보', headerRight: HeaderRight}}
      />
      <Stack.Screen
        name="JobPost"
        component={JobPostScreen}
        options={{
          title: '구인 공고',
          headerRight: HeaderRight,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
