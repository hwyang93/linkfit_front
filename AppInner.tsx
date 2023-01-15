import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
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
  // Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  LogIn: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
};

function AppInner() {
  // const dispatch = useAppDispatch();
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const isLoggedIn = true;

  return isLoggedIn ? <MainStack /> : <AuthStack />;
}

export default AppInner;
