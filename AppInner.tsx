import {useSelector} from 'react-redux';
import {RootState} from '@store/reducer';
import MainStack from '@navigations/MainStack';
// import AuthStack from '@navigations/AuthStack';

// export type LoggedInParamList = {
export type LoggedInParamList = {
  ContentTab: undefined;
  Link: undefined;
  Message: undefined;
  Community: undefined;
  My: undefined;
  RecruitMap: undefined;
  RecruitList: undefined;
  InstructorList: undefined;
  Profile: {memberSeq: number};
  Suggestion: undefined;
  CenterInfo: undefined;
  JobPost: undefined;
  Gallery: any;
  // Complete: {orderId: string};
  LogIn: {email: string};
  SignIn: undefined;
  SignUp: {email: string};
  Terms: {email: string};
  SignUpForm: {email: string};
  CompanySignUpForm: {email: string};
  PasswordReset: undefined;
};

// export type RootStackParamList = {
//   LogIn: {email: string};
//   SignIn: undefined;
//   SignUp: {email: string};
//   Terms: {email: string};
//   SignUpForm: {email: string};
//   CompanySignUpForm: {email: string};
//   PasswordReset: undefined;
// };

function AppInner() {
  // const dispatch = useAppDispatch();
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  // const isLoggedIn = true;

  // return isLoggedIn ? <MainStack /> : <AuthStack />;
  return <MainStack />;
}

export default AppInner;
