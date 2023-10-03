import { ROUTE } from '@/lib/constants/route';
import { FindEmailScreen } from '@/screen/auth/find-email.screen';
import { SignInEmailScreen } from '@/screen/auth/sign-in-email.screen';
import { SignInPasswordScreen } from '@/screen/auth/sign-in-password.screen';
import { SignUpScreen } from '@/screen/auth/sign-up.screen';
import { CompanySignUpFormScreen } from '@/screen/registration/company-sign-up.screen';
import { PasswordResetScreen } from '@/screen/registration/password-reset.screen';
import { SignUpFormScreen } from '@/screen/registration/sign-up-form.screen';
import { TermDetailScreen } from '@/screen/registration/term-detail.screen';
import { TermsAgreementScreen } from '@/screen/registration/terms-agreement.screen';
import { Term } from '@/types/common';
import HeaderLeft from '@components/HeaderLeft';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';

export type AuthStackParamList = {
  SignInEmail: undefined;
  SignInPassword: { email: string };
  SignUp: { email: string };
  TermsAgreement: { email: string; isCompany: boolean };
  TermDetail: { type: Term };
  SignUpForm: { email: string };
  CompanySignUpForm: { email: string };
  FindEmail: undefined;
  PasswordReset: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE.AUTH.SIGN_IN_EMAIL}
      screenOptions={{
        headerTitleAlign: 'center', // 모든 홈 타이틀 가운데 정렬
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '500',
        },
        contentStyle: { backgroundColor: WHITE },
      }}>
      <Stack.Group
        screenOptions={{
          headerLeft: HeaderLeft,
        }}>
        <Stack.Screen
          name={ROUTE.AUTH.SIGN_IN_EMAIL}
          component={SignInEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.SIGN_IN_PASSWORD}
          component={SignInPasswordScreen}
          options={{ title: '로그인' }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.TERMS_AGREEMENT}
          component={TermsAgreementScreen}
          options={{ title: '회원가입' }}
        />

        <Stack.Screen
          name={ROUTE.AUTH.SIGN_UP}
          component={SignUpScreen}
          options={{ title: '회원가입' }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.SIGN_UP_FORM}
          component={SignUpFormScreen}
          options={{ title: '회원가입' }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.COMPANY_SIGN_UP_FORM}
          component={CompanySignUpFormScreen}
          options={{ title: '회원가입' }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.FIND_EMAIL}
          component={FindEmailScreen}
          options={{ title: '이메일 찾기' }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.PASSWORD_RESET}
          component={PasswordResetScreen}
          options={{ title: '비밀번호 재설정' }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}>
        <Stack.Screen name={ROUTE.TERM.DETAIL} component={TermDetailScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
