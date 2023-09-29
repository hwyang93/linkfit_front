const REPLY_STATUS = {
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  WAITING: 'WAITING',
  CLOSED: 'CLOSED',
};

export type ReplyStatus = (typeof REPLY_STATUS)[keyof typeof REPLY_STATUS];

export const REPLY_STATUS_KO: Record<ReplyStatus, string> = {
  [REPLY_STATUS.ACCEPT]: '답변 수락',
  [REPLY_STATUS.REJECT]: '답변 거절',
  [REPLY_STATUS.WAITING]: '답변 대기중',
  [REPLY_STATUS.CLOSED]: '제안 마감',
};
