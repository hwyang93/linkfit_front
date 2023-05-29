import LogInScreen from '@/screen/LogInScreen';
import PasswordResetScreen from '@/screen/Registration/PasswordResetScreen';
import SignInScreen from '@/screen/SignInScreen';
import SignUpScreen from '@/screen/SignUpScreen';
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
  Terms: {email: string};
  SignUpForm: {email: string};
  CompanySignUpForm: {email: string};
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
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{title: '비밀번호 재설정'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
