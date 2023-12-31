import { fetchMemberInfo } from '@/api/member';
import STORAGE_KEY from '@/lib/constants/storage';
import { requestPermission } from '@/lib/util';
import { AuthStack } from '@/navigations/auth-stack';
import { MainStack } from '@/navigations/main-stack';
import { useAppDispatch, useAppSelector } from '@/store';
import { Term } from '@/types/common';
import toast from '@hooks/toast';
import userSlice from '@slices/user';
import { isAxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';

export type LoggedInParamList = {
  ContentTab: any;
  Link: undefined;
  Message: undefined;
  Community: undefined;
  CommunityMy: undefined;
  CommunityPostCreate: undefined;
  CommunityPost: { postId: number };
  My: undefined;
  MyCenter: undefined;
  MyCenterInfo: undefined;
  MyNotification: undefined;

  CenterProfile: { memberSeq: number };
  CenterProfileEdit: undefined;
  CompanyInfo: undefined;
  CenterRecruitment: undefined;
  SendSuggestion: undefined;
  SendSuggestionDetail: undefined;

  MyProfile: undefined;
  ProfileEdit: undefined;
  CertifyLocation: undefined;
  CertifyInstructor: undefined;
  CertifyInstructorForm: undefined;
  ResumeManage: undefined;
  ResumeCreate: undefined;
  ResumeEdit: { resumeId: number };
  ResumePreview: { resumeSeq: number; applySeq?: number; recruitSeq?: number };
  ReviewManage: undefined;
  ReviewCreate: undefined;
  ReviewEdit: { reviewId: number };
  ApplicationStatus: undefined;
  ApplicantStatus: { recruitSeq: number };
  ReceivedSuggestion: undefined;
  ReceivedSuggestionDetail: { suggestSeq: number };
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
  Rules: undefined;
  LinkAdd: undefined;
  RecruitMap: undefined;
  RecruitList: undefined;
  InstructorList: undefined;
  Profile: { memberSeq: number };
  Suggestion: { targetMemberSeq: number };
  CenterInfo: { memberSeq: number };
  JobPost: { recruitSeq: number };
  Gallery: any;
  RecruitCreate: undefined;
  RecruitEdit: { recruitId: number };
  SignInPassword: { email: string };
  SignInEmail: undefined;
  SignUp: { email: string };
  TermsAgreement: { email: string; isCompany: boolean };
  TermList: undefined;
  TermDetail: { type: Term };
  SignUpForm: { email: string };
  CompanySignUpForm: { email: string };
  PasswordChange: undefined;
  PasswordReset: undefined;
  CommunityCommentEdit: { commentId: number };
  CommunityPostEdit: { postId: number };
  InquiryDetail: { inquiryId: number };
  NoticeList: undefined;
  NoticeDetail: { noticeId: number };
};

const AppInner = () => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useAppDispatch();

  // const position = useAppSelector(state => state.user.lon);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

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
        toast.error({ message: error.message });
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
    requestPermission().then((result) => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          (pos) => {
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
          (error) => {
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
