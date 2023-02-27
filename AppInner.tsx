import {useSelector} from 'react-redux';
import MainStack from '@navigations/MainStack';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from 'react-native-geolocation-service';
import userSlice from '@slices/user';
import {PermissionsAndroid, Platform} from 'react-native';
import {useAppDispatch} from '@/store';
import {RootState} from '@store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';
import {fetchMemberInfo} from '@/api/member';

// import AuthStack from '@navigations/AuthStack';

// export type LoggedInParamList = {
export type LoggedInParamList = {
  ContentTab: any;
  Link: undefined;
  Message: undefined;
  Community: undefined;
  CommunityMy: undefined;
  CommunityPostForm: undefined;
  CommunityPost: undefined;
  My: undefined;
  MyCenter: undefined;
  MyCenterInfo: undefined;
  MyNotification: undefined;

  CenterProfile: undefined;
  CenterProfileEdit: undefined;
  CompanyInfo: undefined;
  CenterRecruitment: undefined;
  SendSuggestion: undefined;
  SendSuggestionDetail: undefined;

  ProfileEdit: {memberInfo: any};
  CertifyLocation: undefined;
  CertifyInstructor: undefined;
  CertifyInstructorForm: undefined;
  ResumeManage: undefined;
  ResumeForm: undefined;
  ResumePreview: {resumeSeq: number};
  ReviewManage: undefined;
  ReviewForm: {reputationInfo: any};
  ApplicationStatus: undefined;
  ApplicantStatus: {recruitSeq: number};
  ReceivedSuggestion: undefined;
  ReceivedSuggestionDetail: undefined;
  MyPost: undefined;
  FollowingManage: undefined;
  BookmarkManage: undefined;
  Setting: undefined;
  NotificationSetting: undefined;
  Account: undefined;
  Blacklist: undefined;
  Notice: undefined;
  Inquiry: undefined;
  Version: undefined;
  Rule: undefined;
  LinkAdd: undefined;
  RecruitMap: undefined;
  RecruitList: undefined;
  InstructorList: undefined;
  Profile: {memberSeq: number};
  Suggestion: {targetMemberSeq: number};
  CenterInfo: undefined;
  JobPost: {recruitSeq: number};
  Gallery: any;
  JobOfferForm: undefined;
  LogIn: {email: string};
  SignIn: undefined;
  SignUp: {email: string};
  Terms: {email: string};
  SignUpForm: {email: string};
  CompanySignUpForm: {email: string};
  PasswordReset: undefined;
};

async function requestPermission() {
  try {
    // IOS 위치 정보 수집 권한 요청
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

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
  const dispatch = useAppDispatch();
  const position = useSelector((state: RootState) => state.user.lon);

  useEffect(() => {
    const tokenCheck = async () => {
      const token = await EncryptedStorage.getItem('accessToken');

      if (token) {
        await fetchMemberInfo()
          .then(({data}: any) => {
            console.log('임시 로그인');
            dispatch(
              userSlice.actions.setUser({
                name: data.name,
                email: data.email,
              }),
            );
          })
          .catch((e: {message: any}) => {
            console.log(e.message);
          });
      }
    };
    tokenCheck();
  }, [dispatch]);

  useEffect(() => {
    SplashScreen.hide();
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos: any) => {
            dispatch(
              userSlice.actions.setLocation({
                lon: pos.coords.latitude,
                lat: pos.coords.longitude,
              }),
            );

            //
            // setMyLocation({
            //   latitude: pos.coords.latitude,
            //   longitude: pos.coords.longitude,
            // });
            // console.log('로케이션 위치', myLocation);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
  }, [dispatch]);

  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  // const isLoggedIn = true;

  // return isLoggedIn ? <MainStack /> : <AuthStack />;
  return <MainStack />;
}

export default AppInner;
