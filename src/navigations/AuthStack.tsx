import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {WHITE} from '@styles/colors';
import HeaderLeft from '@components/HeaderLeft';
import SignIn from '@screen/SignIn';
import Login from '@screen/Login';
import SignUp from '@screen/SignUp';
import PasswordReset from '@screen/Registration/PasswordReset';
import SignUpFormScreen from '@screen/Registration/SignUpFormScreen';
import CompanySignUpFormScreen from '@screen/Registration/CompanySignUpFormScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
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
        name="LogIn"
        component={Login}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );
};

export default AuthStack;
