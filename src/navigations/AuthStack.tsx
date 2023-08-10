import FindEmailScreen from '@/screen/Auth/FindEmailScreen';
import LogInScreen from '@/screen/Auth/LogInScreen';
import SignInScreen from '@/screen/Auth/SignInScreen';
import SignUpScreen from '@/screen/Auth/SignUpScreen';
import PasswordResetScreen from '@/screen/Registration/PasswordResetScreen';
import TermDetailScreen from '@/screen/Registration/TermDetailScreen';
import HeaderLeft from '@components/HeaderLeft';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CompanySignUpFormScreen from '@screen/Registration/CompanySignUpFormScreen';
import SignUpFormScreen from '@screen/Registration/SignUpFormScreen';
import TermsScreen from '@screen/Registration/TermsScreen';
import {WHITE} from '@styles/colors';

export type AuthStackParamList = {
  LogIn: {email: string};
  SignIn: undefined;
  SignUp: {email: string};
  Terms: {email: string; isCompany: boolean};
  TermDetail: undefined;
  SignUpForm: {email: string};
  CompanySignUpForm: {email: string};
  FindEmail: undefined;
  PasswordReset: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerTitleAlign: 'center', // 모든 홈 타이틀 가운데 정렬
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '500',
        },
        contentStyle: {backgroundColor: WHITE},
      }}>
      <Stack.Group
        screenOptions={{
          headerLeft: HeaderLeft,
        }}>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{title: '회원가입'}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
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
          name="FindEmail"
          component={FindEmailScreen}
          options={{title: '이메일 찾기'}}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordResetScreen}
          options={{title: '비밀번호 재설정'}}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen
          name="TermDetail"
          component={TermDetailScreen}
          options={{title: '개인정보 수집 및 이용동의'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
