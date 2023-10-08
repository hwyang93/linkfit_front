export const MEMBER_TYPE = {
  PUBLIC: 'PUBLIC',
  INSTRUCTOR: 'INSTRUCTOR',
  COMPANY: 'COMPANY',
  CENTER: 'CENTER',
} as const;

export type MemberType = (typeof MEMBER_TYPE)[keyof typeof MEMBER_TYPE];

export const REPLY_STATUS = {
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  WAITING: 'WAITING',
  CLOSED: 'CLOSED',
} as const;

export type ReplyStatus = (typeof REPLY_STATUS)[keyof typeof REPLY_STATUS];

export const REPLY_STATUS_KO = {
  [REPLY_STATUS.ACCEPT]: '답변 수락',
  [REPLY_STATUS.REJECT]: '답변 거절',
  [REPLY_STATUS.WAITING]: '답변 대기중',
  [REPLY_STATUS.CLOSED]: '제안 마감',
} satisfies Record<ReplyStatus, string>;

export const FIELD_TYPE_KO = {
  PILATES: '필라테스',
  YOGA: '요가',
} as const;

export type FieldTypeKo = (typeof FIELD_TYPE_KO)[keyof typeof FIELD_TYPE_KO];

const RESUME_STATUS = {
  APPLY: 'APPLY',
  CANCEL: 'CANCEL',
  OPEN: 'OPEN',
  PASS: 'PASS',
  FAIL: 'FAIL',
} as const;

export type ResumeStatus = (typeof RESUME_STATUS)[keyof typeof RESUME_STATUS];

export const RESUME_STATUS_KO = {
  APPLY: '지원 완료',
  CANCEL: '지원 취소',
  OPEN: '열람',
  PASS: '합격',
  FAIL: '불합격',
} satisfies Record<ResumeStatus, string>;

export const RECRUIT_STATUS = {
  APPLY: 'APPLY',
  PROCESS: 'PROCESS',
  APPROVAL: 'APPROVAL',
  CANCEL: 'CANCEL',
  WAITING: 'WAITING',
  PASS: 'PASS',
} as const;

export type RecruitStatus = (typeof RECRUIT_STATUS)[keyof typeof RECRUIT_STATUS];

export const RECRUIT_STATUS_KO = {
  APPLY: '지원 완료',
  PROCESS: '서류 전형',
  APPROVAL: '',
  CANCEL: '취소',
  WAITING: '대기중',
  PASS: '합격',
} satisfies Record<RecruitStatus, string>;

export const APPLY_STATUS = {
  APPLY: 'APPLY',
  CANCEL: 'CANCEL',
  VIEWED: 'VIEWED',
  'NOT-VIEWED': 'NOT-VIEWED',
  PASS: 'PASS',
  FAIL: 'FAIL',
} as const;

export type ApplyStatus = (typeof APPLY_STATUS)[keyof typeof APPLY_STATUS];

export const APPLY_STATUS_KO = {
  APPLY: '지원 완료',
  CANCEL: '지원 취소',
  VIEWED: '열람',
  'NOT-VIEWED': '미열람',
  PASS: '합격',
  FAIL: '불합격',
} satisfies Record<ApplyStatus, string>;
