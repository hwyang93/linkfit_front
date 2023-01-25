import {useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import MainStack from '@navigations/MainStack';
import AuthStack from '@navigations/AuthStack';

export type LoggedInParamList = {
  ContentTab: undefined;
  Link: undefined;
  Message: undefined;
  Community: undefined;
  My: undefined;
  RecruitMap: undefined;
  RecruitList: undefined;
  InstructorList: undefined;
  // Complete: {orderId: string};
};

export type RootStackParamList = {
  LogIn: {email: string};
  SignIn: undefined;
  SignUp: undefined;
  Terms: undefined;
  SignUpForm: undefined;
  CompanySignUpForm: undefined;
  PasswordReset: undefined;
};

function AppInner() {
  // const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  // const isLoggedIn = true;

  return isLoggedIn ? <MainStack /> : <AuthStack />;
}

export default AppInner;
