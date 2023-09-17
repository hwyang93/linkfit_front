export const AuthRoutes = {
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
  LOG_IN: 'Login',
  PASSWORD_RESET: 'PasswordReset',
};

export const MainRoutes = {
  LINK: 'Link',
  COMMUNITY: 'Community',
  MESSAGE: 'Message',
  MY: 'My',
};

export const ContentRoutes = {
  RECRUIT_MAP: 'recruitMap',
  RECRUIT_LIST: 'RecruitList',
};

export const ROUTE = {
  NOTICE_LIST: 'Notice',
  NOTICE_DETAIL: 'NoticeDetail',
  MY: {
    INQUIRY_LIST: 'Inquiry',
    INQUIRY_DETAIL: 'InquiryDetail',
    INQUIRY_FORM: 'InquiryForm',
    RECEIVED_POSITION_SUGGESTION_LIST: 'ReceivedSuggestion',
    RECEIVED_POSITION_SUGGESTION_DETAIL: 'ReceivedSuggestionDetail',
  },
  COMMUNITY: {
    POST_CREATE: 'CommunityPostForm',
    COMMENT_EDIT: 'CommunityCommentEdit',
    POST_EDIT: 'CommunityPostEdit',
    POST_DETAIL: 'CommunityPost',
  },
} as const;
