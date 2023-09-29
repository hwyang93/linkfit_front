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

export const REPLY_STATUS_KO: Record<ReplyStatus, string> = {
  [REPLY_STATUS.ACCEPT]: '답변 수락',
  [REPLY_STATUS.REJECT]: '답변 거절',
  [REPLY_STATUS.WAITING]: '답변 대기중',
  [REPLY_STATUS.CLOSED]: '제안 마감',
};

export const FIELD_TYPE_KO = {
  PILATES: '필라테스',
  YOGA: '요가',
} as const;

export type FieldTypeKo = (typeof FIELD_TYPE_KO)[keyof typeof FIELD_TYPE_KO];
