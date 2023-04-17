import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContentTab from '@navigations/ContentTab';
import {LoggedInParamList} from '../../AppInner';
import HeaderLeft from '@components/HeaderLeft';
import {WHITE} from '@styles/colors';
import RecruitMapScreen from '@screen/RecruitMapScreen';
import RecruitListScreen from '@screen/RecruitListScreen';
import InstructorListScreen from '@screen/InstructorListScreen';
import ProfileScreen from '@screen/ProfileScreen';
import HeaderRight from '@components/HeaderRight';
import SuggestionScreen from '@screen/SuggestionScreen';
import CenterInfoScreen from '@screen/CenterInfoScreen';
import JobPostScreen from '@screen/JobPostScreen';
import GalleryScreen from '@screen/GalleryScreen';
import SignIn from '@screen/SignIn';
import Login from '@screen/Login';
import TermsScreen from '@screen/Registration/TermsScreen';
import SignUp from '@screen/SignUp';
import SignUpFormScreen from '@screen/Registration/SignUpFormScreen';
import CompanySignUpFormScreen from '@screen/Registration/CompanySignUpFormScreen';
import PasswordReset from '@screen/Registration/PasswordReset';
import JobOfferFormScreen from '@screen/JobOfferFormScreen';
import ProfileEditScreen from '@screen/My/ProfileEditScreen';
import LinkAddScreen from '@screen/My/LinkAddScreen';
import CertifyInstructorScreen from '@screen/My/CertifyInstructorScreen';
import CertifyLocationScreen from '@screen/My/CertifyLocationScreen';
import {Alert, Image, Pressable} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CertifyInstructorFormScreen from '@screen/My/CertifyInstructorFormScreen';
import ReviewManageScreen from '@screen/My/ReviewManageScreen';
import FollowingManageScreen from '@screen/My/FollowingManageScreen';
import BookmarkManageScreen from '@screen/My/BookmarkManageScreen';
import SettingScreen from '@screen/My/SettingScreen';
import NotificationSettingScreen from '@screen/My/NotificationSettingScreen';
import AccountScreen from '@screen/My/AccountScreen';
import BlacklistScreen from '@screen/My/BlacklistScreen';
import NoticeScreen from '@screen/My/NoticeScreen';
import InquiryScreen from '@screen/My/InquiryScreen';
import VersionScreen from '@screen/My/VersionScreen';
import RulesScreen from '@screen/My/RulesScreen';
import ReviewFormScreen from '@screen/My/ReviewFormScreen';
import CommunityPostFormScreen from '@screen/Community/CommunityPostFormScreen';
import CommunityPostScreen from '@screen/Community/CommunityPostScreen';
import CommunityMyScreen from '@screen/Community/CommunityMyScreen';
import MyCenterScreen from '@screen/MyCenterScreen';
import ResumeManageScreen from '@screen/My/ResumeManageScreen';
import ResumeFormScreen from '@screen/My/ResumeFormScreen';
import ResumePreviewScreen from '@screen/My/ResumePreviewScreen';
import ApplicationStatusScreen from '@screen/My/ApplicationStatusScreen';
import ReceivedSuggestionScreen from '@screen/My/ReceivedSuggestionScreen';
import MyRecruitmentScreen from '@screen/My/MyRecruitmentScreen';
import ReceivedSuggestionDetailScreen from '@screen/My/ReceivedSuggestionDetailScreen';
import ApplicantStatusScreen from '@screen/My/ApplicantStatusScreen';
import MyCenterProfileScreen from '@screen/MyCenterProfileScreen';
import CenterProfileEditScreen from '@screen/My/CenterProfileEditScreen';
import CompanyInfoScreen from '@screen/My/CompanyInfoScreen';
import CenterRecruitmentScreen from '@screen/My/CenterRecruitmentScreen';
import SendSuggestionScreen from '@screen/My/SendSuggestionScreen';
import SendSuggestionDetailScreen from '@screen/My/SendSuggestionDetailScreen';
import {SetStateAction, useState} from 'react';
import Modal from '@components/ModalSheet';
import MyNotificationScreen from '@screen/My/MyNotificationScreen';
import MyProfileScreen from '@screen/My/MyProfileScreen';
import InquiryFormScreen from '@screen/My/InquiryFormScreen';

const Stack = createNativeStackNavigator<LoggedInParamList>();

const MainStack = () => {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '400',
        },
        contentStyle: {backgroundColor: WHITE},
        headerShadowVisible: false,
        headerLeft: HeaderLeft,
        gestureEnabled: false,
      }}>
      <Stack.Group>
        <Stack.Screen
          name="ContentTab"
          component={ContentTab}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="RecruitMap"
          component={RecruitMapScreen}
          options={{title: '구인'}}
        />
        <Stack.Screen
          name="RecruitList"
          component={RecruitListScreen}
          options={{title: '구인'}}
        />
        <Stack.Screen
          name="InstructorList"
          component={InstructorListScreen}
          options={{title: '강사'}}
        />
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            title: '3/5',
            headerStyle: {backgroundColor: '#000'},
            headerTintColor: '#fff',
          }}
        />
        {/* 커뮤니티 게시글 작성 화면 */}
        <Stack.Screen
          name="CommunityPostForm"
          component={CommunityPostFormScreen}
          options={{title: '게시글 작성'}}
        />
        {/* 커뮤니티 게시글 화면 */}
        <Stack.Screen
          name="CommunityPost"
          component={CommunityPostScreen}
          options={{
            title: '게시글',
            headerRight: () => (
              <Pressable
                onPress={() => {}}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.BOOKMARK} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        {/* 커뮤니티 MY 화면 */}
        <Stack.Screen
          name="CommunityMy"
          component={CommunityMyScreen}
          options={{title: 'MY 커뮤니티'}}
        />
        {/* 임시 My 센터 */}
        <Stack.Screen
          name="MyCenter"
          component={MyCenterScreen}
          options={{title: 'MY 센터'}}
        />
        <Stack.Screen
          name="CenterProfile"
          component={MyCenterProfileScreen}
          options={{
            title: '프로필',
            headerRight: () => (
              <Pressable
                onPress={() => {}}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_BUTTON} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="CenterProfileEdit"
          component={CenterProfileEditScreen}
          options={{title: '센터 프로필'}}
        />
        <Stack.Screen
          name="CompanyInfo"
          component={CompanyInfoScreen}
          options={{title: '사업자 정보'}}
        />
        <Stack.Screen
          name="CenterRecruitment"
          component={CenterRecruitmentScreen}
          options={{title: '채용 공고'}}
        />
        <Stack.Screen
          name="SendSuggestion"
          component={SendSuggestionScreen}
          options={{title: '보낸 포지션 제안'}}
        />
        <Stack.Screen
          name="SendSuggestionDetail"
          component={SendSuggestionDetailScreen}
          options={{
            title: '포지션 제안',
            headerRight: () => {
              const MODAL = [
                {
                  value: '제안 수정하기',
                  job: () => {},
                },
                {
                  value: '제안 취소하기',
                  job: () => {},
                },
              ];
              return (
                <>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    hitSlop={10}
                    style={[common.mh4, common.size24]}>
                    <Image source={iconPath.KEBAB} style={common.size24} />
                  </Pressable>
                  <Modal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    title={'더보기'}
                    modalData={MODAL}
                  />
                </>
              );
            },
          }}
        />
        {/* 강사 프로필 화면 */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '강사 프로필',
            headerRight: () => (
              <Pressable
                onPress={() => {}}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.MESSAGE} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        {/* 나의 프로필 화면 */}
        <Stack.Screen
          name="MyProfile"
          component={MyProfileScreen}
          options={{
            title: '프로필',
            headerRight: () => (
              <Pressable
                onPress={() => {}}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_BUTTON} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{title: '프로필'}}
        />
        <Stack.Screen
          name="MyNotification"
          component={MyNotificationScreen}
          options={{title: '알림'}}
        />
        <Stack.Screen
          name="CertifyInstructor"
          component={CertifyInstructorScreen}
          options={{
            title: '강사 인증 관리',
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('CertifyInstructorForm')}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_LICENSE} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="CertifyInstructorForm"
          component={CertifyInstructorFormScreen}
          options={{title: '강사 인증'}}
        />
        <Stack.Screen
          name="ResumeManage"
          component={ResumeManageScreen}
          options={{
            title: '이력서 관리',
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('ResumeForm')}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_LICENSE} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="ResumeForm"
          component={ResumeFormScreen}
          options={{title: '이력서'}}
        />
        <Stack.Screen
          name="ResumePreview"
          component={ResumePreviewScreen}
          options={{
            title: '이력서 미리보기',
            // headerRight: () => (
            //   <Pressable
            //     onPress={() => Alert.alert('test', '좋아용')}
            //     hitSlop={10}
            //     style={[common.mh4, common.size24]}>
            //     <Image source={iconPath.BOOKMARK} style={common.size24} />
            //   </Pressable>
            // ),
          }}
        />
        {/* 지원 현황 */}
        <Stack.Screen
          name="ApplicationStatus"
          component={ApplicationStatusScreen}
          options={{title: '지원 현황'}}
        />
        {/* 받은 포지션 제안 */}
        <Stack.Screen
          name="ReceivedSuggestion"
          component={ReceivedSuggestionScreen}
          options={{title: '받은 포지션 제안'}}
        />
        <Stack.Screen
          name="ReceivedSuggestionDetail"
          component={ReceivedSuggestionDetailScreen}
          options={{title: '받은 포지션 제안'}}
        />
        {/* 내 공고 */}
        <Stack.Screen
          name="MyPost"
          component={MyRecruitmentScreen}
          options={{title: '공고 현황'}}
        />
        <Stack.Screen
          name="ApplicantStatus"
          component={ApplicantStatusScreen}
          options={{title: '지원자 현황'}}
        />
        <Stack.Screen
          name="ReviewManage"
          component={ReviewManageScreen}
          options={{title: '작성 후기 관리'}}
        />
        <Stack.Screen
          name="ReviewForm"
          component={ReviewFormScreen}
          options={{title: '후기 작성'}}
        />
        <Stack.Screen
          name="FollowingManage"
          component={FollowingManageScreen}
          options={{title: '팔로잉 관리'}}
        />
        <Stack.Screen
          name="CertifyLocation"
          component={CertifyLocationScreen}
          options={{title: '지역 인증'}}
        />
        <Stack.Screen
          name="BookmarkManage"
          component={BookmarkManageScreen}
          options={{title: '북마크 관리'}}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{title: '설정'}}
        />
        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSettingScreen}
          options={{title: '알림 설정'}}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{title: '계정 관리'}}
        />
        <Stack.Screen
          name="Blacklist"
          component={BlacklistScreen}
          options={{title: '차단 사용자 관리'}}
        />
        <Stack.Screen
          name="Notice"
          component={NoticeScreen}
          options={{title: '공지사항'}}
        />
        <Stack.Screen
          name="Inquiry"
          component={InquiryScreen}
          options={{title: '1:1 문의 내역'}}
        />
        <Stack.Screen
          name="InquiryForm"
          component={InquiryFormScreen}
          options={{title: '문의하기'}}
        />
        <Stack.Screen
          name="Version"
          component={VersionScreen}
          options={{title: '버전 정보'}}
        />
        <Stack.Screen
          name="Rule"
          component={RulesScreen}
          options={{title: '서비스 이용약관'}}
        />
        <Stack.Screen
          name="LinkAdd"
          component={LinkAddScreen}
          options={{title: '링크 추가'}}
        />
        <Stack.Screen
          name="Suggestion"
          component={SuggestionScreen}
          options={{title: '포지션 제안하기'}}
        />
        <Stack.Screen
          name="CenterInfo"
          component={CenterInfoScreen}
          options={{
            title: '센터 정보',
            headerRight: () => (
              <Pressable
                onPress={() => Alert.alert('test', '좋아용')}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.BOOKMARK} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="JobPost"
          component={JobPostScreen}
          options={{
            title: '구인 공고',
            headerRight: HeaderRight,
          }}
        />
        <Stack.Screen
          name="JobOfferForm"
          component={JobOfferFormScreen}
          options={{
            title: '채용 공고 등록',
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{title: '회원가입'}}
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
