import IconButton from '@/components/Common/IconButton';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { BottomTab } from '@/navigations/bottom-tab';
import { CenterInfoScreen } from '@/screen/center-info.screen';
import { CommunityCommentEditScreen } from '@/screen/community/community-comment-edit.screen';
import { CommunityMyScreen } from '@/screen/community/community-my.screen';
import { CommunityPostCreateScreen } from '@/screen/community/community-post-create';
import { CommunityPostDetailScreen } from '@/screen/community/community-post-detail.screen';
import { CommunityPostEditScreen } from '@/screen/community/community-post-edit.screen';
import { GalleryScreen } from '@/screen/gallery.screen';
import { InstructorListScreen } from '@/screen/instructor-list.screen';
import { JobPostScreen } from '@/screen/job-post.screen';
import { MyCenterProfileScreen } from '@/screen/my-center-profile.screen';
import { MyCenterScreen } from '@/screen/my-center.screen';
import { AccountScreen } from '@/screen/my/account.screen';
import { ApplicantStatusScreen } from '@/screen/my/applicant-status.screen';
import { ApplicationStatusScreen } from '@/screen/my/application-status.screen';
import { BlacklistScreen } from '@/screen/my/blacklist.screen';
import { BookmarkManageScreen } from '@/screen/my/bookmark-manage.screen';
import { CenterProfileEditScreen } from '@/screen/my/center-profile-edit.screen';
import { CenterRecruitmentScreen } from '@/screen/my/center-recruitment.screen';
import { CertifyInstructorFormScreen } from '@/screen/my/certify-instructor-form.screen';
import { CertifyInstructorScreen } from '@/screen/my/certify-instructor.screen';
import { CertifyLocationScreen } from '@/screen/my/certify-location.screen';
import { CompanyInfoScreen } from '@/screen/my/company-info.screen';
import { FollowingManageScreen } from '@/screen/my/following-manage.screen';
import { InquiryDetailScreen } from '@/screen/my/inquiry-detail.screen';
import { InquiryFormScreen } from '@/screen/my/inquiry-form.screen';
import { InquiryListScreen } from '@/screen/my/inquiry-list.screen';
import { LinkAddScreen } from '@/screen/my/link-add.screen';
import { MyNotificationScreen } from '@/screen/my/my-notification.screen';
import { MyProfileScreen } from '@/screen/my/my-profile.screen';
import { MyRecruitmentScreen } from '@/screen/my/my-recruitment.screen';
import { NoticeDetailScreen } from '@/screen/my/notice-detail.screen';
import { NoticeListScreen } from '@/screen/my/notice-list.screen';
import { NotificationSettingScreen } from '@/screen/my/notification-setting.screen';
import { ProfileEditScreen } from '@/screen/my/profile-edit.screen';
import { ReceivedPositionSuggestionDetailScreen } from '@/screen/my/received-position-suggestion-detail.screen';
import { ReceivedPositionSuggestionListScreen } from '@/screen/my/received-position-suggestion-list.screen';
import { ResumeCreateScreen } from '@/screen/my/resume-create.screen';
import { ResumeManageScreen } from '@/screen/my/resume-manange.screen';
import { ResumePreviewScreen } from '@/screen/my/resume-preview.screen';
import { ReviewCreateScreen } from '@/screen/my/review-create.screen';
import { ReviewEditScreen } from '@/screen/my/review-edit.screen';
import { ReviewManageScreen } from '@/screen/my/review-manage';
import { RulesScreen } from '@/screen/my/rules.screen';
import { SendSuggestionDetailScreen } from '@/screen/my/send-suggestion-detail.screen';
import { SendSuggestionScreen } from '@/screen/my/send-suggestion.screen';
import { SettingScreen } from '@/screen/my/setting.screen';
import { VersionScreen } from '@/screen/my/version.screen';
import { ProfileScreen } from '@/screen/profile.screen';
import { RecruitCreateScreen } from '@/screen/recruit-create.screen';
import { RecruitEditScreen } from '@/screen/recruit-edit.screen';
import { RecruitListScreen } from '@/screen/recruit-list.screen';
import { RecruitMapScreen } from '@/screen/recruit-map.screen';
import { PasswordResetScreen } from '@/screen/registration/password-reset.screen';
import { SuggestionScreen } from '@/screen/suggestion.screen';
import HeaderLeft from '@components/HeaderLeft';
import Modal from '@components/ModalSheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Alert, Image, Pressable } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

const Stack = createNativeStackNavigator<LoggedInParamList>();

export const MainStack = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <Stack.Navigator
      initialRouteName={ROUTE.TAB.CONTENT}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '400',
        },
        contentStyle: { backgroundColor: WHITE },
        headerShadowVisible: false,
        headerLeft: HeaderLeft,
        gestureEnabled: false,
      }}>
      <Stack.Group>
        <Stack.Screen
          name={ROUTE.TAB.CONTENT}
          component={BottomTab}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name={ROUTE.RECRUIT.MAP}
          component={RecruitMapScreen}
          options={{ title: '구인' }}
        />
        <Stack.Screen
          name={ROUTE.RECRUIT.LIST}
          component={RecruitListScreen}
          options={{ title: '구인' }}
        />
        <Stack.Screen
          name={ROUTE.INSTRUCTOR.LIST}
          component={InstructorListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTE.GALLERY}
          component={GalleryScreen}
          options={{
            title: '3/5',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name={ROUTE.COMMUNITY.POST_CREATE}
          component={CommunityPostCreateScreen}
          options={{ title: '게시글 작성' }}
        />
        <Stack.Screen
          name={ROUTE.COMMUNITY.POST_DETAIL}
          component={CommunityPostDetailScreen}
          options={{
            title: '게시글',
            // headerRight: () => (
            //   <Pressable
            //     onPress={() => {}}
            //     hitSlop={10}
            //     style={[common.mh4, common.size24]}>
            //     <Image source={iconPath.BOOKMARK} style={common.size24} />
            //   </Pressable>
            // ),
          }}
        />
        <Stack.Screen
          name={ROUTE.COMMUNITY.MY}
          component={CommunityMyScreen}
          options={{ title: 'MY 커뮤니티' }}
        />
        {/* 임시 My 센터 */}
        <Stack.Screen name="MyCenter" component={MyCenterScreen} options={{ title: 'MY 센터' }} />
        <Stack.Screen
          name="CenterProfile"
          component={MyCenterProfileScreen}
          options={{
            title: '프로필',
            headerRight: () => (
              <Pressable onPress={() => {}} hitSlop={10} style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_BUTTON} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="CenterProfileEdit"
          component={CenterProfileEditScreen}
          options={{ title: '센터 프로필' }}
        />
        <Stack.Screen
          name="CompanyInfo"
          component={CompanyInfoScreen}
          options={{ title: '사업자 정보' }}
        />
        <Stack.Screen
          name="CenterRecruitment"
          component={CenterRecruitmentScreen}
          options={{ title: '채용 공고' }}
        />
        <Stack.Screen
          name="SendSuggestion"
          component={SendSuggestionScreen}
          options={{ title: '보낸 포지션 제안' }}
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
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '강사 프로필' }} />
        {/* 나의 프로필 화면 */}
        <Stack.Screen
          name="MyProfile"
          component={MyProfileScreen}
          options={{
            title: '프로필',
            headerRight: () => (
              <Pressable onPress={() => {}} hitSlop={10} style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_BUTTON} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{ title: '프로필' }}
        />
        <Stack.Screen
          name="MyNotification"
          component={MyNotificationScreen}
          options={{ title: '알림' }}
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
          options={{ title: '강사 인증' }}
        />
        <Stack.Screen
          name={ROUTE.MY.RESUME_MANAGE}
          component={ResumeManageScreen}
          options={{
            title: '이력서 관리',
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate(ROUTE.MY.RESUME_CREATE)}
                hitSlop={10}
                style={[common.mh4, common.size24]}>
                <Image source={iconPath.ADD_LICENSE} style={common.size24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name={ROUTE.MY.RESUME_CREATE}
          component={ResumeCreateScreen}
          options={{ title: '이력서' }}
        />
        <Stack.Screen
          name={ROUTE.MY.RESUME_PREVIEW}
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
          name={ROUTE.MY.APPLICATION_STATUS}
          component={ApplicationStatusScreen}
          options={{ title: '지원 현황' }}
        />
        {/* 받은 포지션 제안 */}
        <Stack.Screen
          name={ROUTE.MY.RECEIVED_POSITION_SUGGESTION_LIST}
          component={ReceivedPositionSuggestionListScreen}
          options={{ title: '받은 포지션 제안' }}
        />
        <Stack.Screen
          name={ROUTE.MY.RECEIVED_POSITION_SUGGESTION_DETAIL}
          component={ReceivedPositionSuggestionDetailScreen}
          options={{ title: '받은 포지션 제안' }}
        />
        {/* 내 공고 */}
        <Stack.Screen
          name="MyPost"
          component={MyRecruitmentScreen}
          options={{ title: '공고 현황' }}
        />
        <Stack.Screen
          name={ROUTE.MY.APPLICANT_STATUS}
          component={ApplicantStatusScreen}
          options={{ title: '지원자 현황' }}
        />
        <Stack.Screen
          name={ROUTE.MY.REVIEW_MANAGE}
          component={ReviewManageScreen}
          options={{ title: '작성 후기 관리' }}
        />
        <Stack.Screen
          name={ROUTE.MY.REVIEW_CREATE}
          component={ReviewCreateScreen}
          options={{ title: '후기 작성' }}
        />
        <Stack.Screen
          name={ROUTE.MY.REVIEW_EDIT}
          component={ReviewEditScreen}
          options={{ title: '후기 수정' }}
        />
        <Stack.Screen
          name={ROUTE.MY.FOLLOWING_MANAGE}
          component={FollowingManageScreen}
          options={{ title: '팔로잉 관리' }}
        />
        <Stack.Screen
          name={ROUTE.MY.CERTIFY_LOCATION}
          component={CertifyLocationScreen}
          options={{ title: '지역 인증' }}
        />
        <Stack.Screen
          name="BookmarkManage"
          component={BookmarkManageScreen}
          options={{ title: '북마크 관리' }}
        />
        <Stack.Screen name="Setting" component={SettingScreen} options={{ title: '설정' }} />
        <Stack.Screen
          name={ROUTE.MY.NOTIFICATION_SETTING}
          component={NotificationSettingScreen}
          options={{ title: '알림 설정' }}
        />
        <Stack.Screen name="Account" component={AccountScreen} options={{ title: '계정 관리' }} />
        <Stack.Screen
          name={ROUTE.MY.BLACKLIST}
          component={BlacklistScreen}
          options={{ title: '차단 사용자 관리' }}
        />
        <Stack.Screen
          name={ROUTE.MY.NOTICE_LIST}
          component={NoticeListScreen}
          options={{ title: '공지사항' }}
        />
        <Stack.Screen
          name={ROUTE.MY.INQUIRY_LIST}
          component={InquiryListScreen}
          options={{ title: '1:1 문의 내역' }}
        />
        <Stack.Screen
          name={ROUTE.MY.INQUIRY_FORM}
          component={InquiryFormScreen}
          options={{ title: '문의하기' }}
        />
        <Stack.Screen
          name={ROUTE.MY.VERSION}
          component={VersionScreen}
          options={{ title: '버전 정보' }}
        />
        <Stack.Screen
          name={ROUTE.MY.RULES}
          component={RulesScreen}
          options={{ title: '서비스 이용약관' }}
        />
        <Stack.Screen
          name={ROUTE.MY.LINK_ADD}
          component={LinkAddScreen}
          options={{ title: '링크 추가' }}
        />
        <Stack.Screen
          name="Suggestion"
          component={SuggestionScreen}
          options={{ title: '포지션 제안하기' }}
        />
        <Stack.Screen
          name="CenterInfo"
          component={CenterInfoScreen}
          options={{
            title: '센터 정보',
            headerRight: () => (
              <Pressable
                onPress={() => Alert.alert('test', '북마크네용')}
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
            headerRight: () => <IconButton source={iconPath.BOOKMARK} hitSlop={10} />,
          }}
        />
        <Stack.Screen
          name={ROUTE.RECRUIT.CREATE}
          component={RecruitCreateScreen}
          options={{
            title: '채용 공고 등록',
          }}
        />
        <Stack.Screen
          name={ROUTE.RECRUIT.EDIT}
          component={RecruitEditScreen}
          options={{
            title: '채용 공고 수정',
          }}
        />
        <Stack.Screen
          name={ROUTE.AUTH.PASSWORD_RESET}
          component={PasswordResetScreen}
          options={{ title: '비밀번호 재설정' }}
        />
        <Stack.Screen
          name="CommunityCommentEdit"
          component={CommunityCommentEditScreen}
          options={{ title: '댓글 수정' }}
        />
        <Stack.Screen
          name="CommunityPostEdit"
          component={CommunityPostEditScreen}
          options={{ title: '게시글 수정' }}
        />
      </Stack.Group>
      <Stack.Screen
        name={ROUTE.MY.INQUIRY_DETAIL}
        component={InquiryDetailScreen}
        options={{ title: '1:1 문의' }}
      />
      <Stack.Screen
        name={ROUTE.MY.NOTICE_DETAIL}
        component={NoticeDetailScreen}
        options={{ title: '공지사항' }}
      />
    </Stack.Navigator>
  );
};
