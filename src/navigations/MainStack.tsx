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
import GalleryScreen from '@screen/GalleryScreen';
import SignIn from '@screen/SignIn';
import Login from '@screen/Login';
import TermsScreen from '@screen/Registration/TermsScreen';
import SignUp from '@screen/SignUp';
import SignUpFormScreen from '@screen/Registration/SignUpFormScreen';
import CompanySignUpFormScreen from '@screen/Registration/CompanySignUpFormScreen';
import PasswordReset from '@screen/Registration/PasswordReset';
import JobOfferFormScreen from '@screen/JobOfferFormScreen';
import ProfileEditScreen from '@screen/My/ProfileEditScreen';
import LinkAddScreen from '@screen/My/LinkAddScreen';
import CertifyInstructorScreen from '@screen/My/CertifyInstructorScreen';
import CertifyLocationScreen from '@screen/My/CertifyLocationScreen';
import {Image, Pressable} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CertifyInstructorFormScreen from '@screen/My/CertifyInstructorFormScreen';

const Stack = createNativeStackNavigator<LoggedInParamList>();

const MainStack = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
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
      <Stack.Group>
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
          name="Gallery"
          component={GalleryScreen}
          options={{
            title: '3/5',
            headerStyle: {backgroundColor: '#000'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: '프로필', headerRight: HeaderRight}}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{title: '프로필'}}
        />
        <Stack.Screen
          name="CertifyInstructor"
          component={CertifyInstructorScreen}
          options={{
            title: '강사 인증 관리',
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('CertifyInstructorForm')}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_LICENSE} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="CertifyInstructorForm"
          component={CertifyInstructorFormScreen}
          options={{title: '강사 인증'}}
        />
        <Stack.Screen
          name="CertifyLocation"
          component={CertifyLocationScreen}
          options={{title: '지역 인증'}}
        />
        <Stack.Screen
          name="LinkAdd"
          component={LinkAddScreen}
          options={{title: '링크 추가'}}
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
        <Stack.Screen
          name="JobOfferForm"
          component={JobOfferFormScreen}
          options={{
            title: '채용 공고 등록',
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="SignUpForm"
          component={SignUpFormScreen}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="CompanySignUpForm"
          component={CompanySignUpFormScreen}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{title: '비밀번호 재설정'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
