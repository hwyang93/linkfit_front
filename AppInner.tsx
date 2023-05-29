import {fetchMemberInfo} from '@/api/member';
import AuthStack from '@/navigations/AuthStack';
import {useAppDispatch, useAppSelector} from '@/store';
import {IS_ANDROID, IS_IOS} from '@/utils/constants/common';
import STORAGE_KEY from '@/utils/constants/storage';
import toast from '@hooks/toast';
import MainStack from '@navigations/MainStack';
import userSlice from '@slices/user';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';

export type LoggedInParamList = {
  ContentTab: any;
  Link: undefined;
  Message: undefined;
  Community: undefined;
  CommunityMy: undefined;
  CommunityPostForm: undefined;
  CommunityPost: {postSeq: number};
  My: undefined;
  MyCenter: undefined;
  MyCenterInfo: undefined;
  MyNotification: undefined;

  CenterProfile: {memberSeq: number};
  CenterProfileEdit: undefined;
  CompanyInfo: undefined;
  CenterRecruitment: undefined;
  SendSuggestion: undefined;
  SendSuggestionDetail: undefined;

  MyProfile: undefined;
  ProfileEdit: {memberInfo: any};
  CertifyLocation: undefined;
  CertifyInstructor: undefined;
  CertifyInstructorForm: undefined;
  ResumeManage: undefined;
  ResumeForm: undefined;
  ResumePreview: {resumeSeq: number; applySeq: any; recruitSeq: any};
  ReviewManage: undefined;
  ReviewForm: {reputationInfo: any};
  ApplicationStatus: undefined;
  ApplicantStatus: {recruitSeq: number};
  ReceivedSuggestion: undefined;
  ReceivedSuggestionDetail: {suggestSeq: number};
  MyPost: undefined;
  FollowingManage: undefined;
  BookmarkManage: undefined;
  Setting: undefined;
  NotificationSetting: undefined;
  Account: undefined;
  Blacklist: undefined;
  Notice: undefined;
  Inquiry: undefined;
  InquiryForm: undefined;
  Version: undefined;
  Rule: undefined;
  LinkAdd: undefined;
  RecruitMap: undefined;
  RecruitList: undefined;
  InstructorList: undefined;
  Profile: {memberSeq: number};
  Suggestion: {targetMemberSeq: number};
  CenterInfo: {memberSeq: number};
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

const requestPermission = async () => {
  try {
    // IOS 위치 정보 수집 권한 요청
    if (IS_IOS) {
      return await Geolocation.requestAuthorization('always');
    }
    // 안드로이드 위치 정보 수집 권한 요청
    if (IS_ANDROID) {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
};

const AppInner = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useAppDispatch();

  // const position = useAppSelector(state => state.user.lon);
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  const getRefreshToken = async () => {
    const token = await EncryptedStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    return token;
  };

  const initAuthentication = useCallback(async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return setInitialized(true);
    }

    try {
      const response = await fetchMemberInfo();
      dispatch(userSlice.actions.setUser(response.data));
      dispatch(userSlice.actions.setIsLoggedIn(true));
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    } finally {
      setInitialized(true);
    }
  }, [dispatch]);

  useEffect(() => {
    initAuthentication();
  }, [initAuthentication]);

  useEffect(() => {
    initialized && SplashScreen.hide();
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
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
  }, [dispatch, initialized]);

  // TODO: 스플래쉬 스크린을 보여줘야 합니다
  if (!initialized) {
    return null;
  }

  return isLoggedIn ? <MainStack /> : <AuthStack />;
};

export default AppInner;
