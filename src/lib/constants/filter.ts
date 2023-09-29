import { REPLY_STATUS_KO } from './enum';

const FILTER = {
  PERIOD: {
    'ONE-WEEK': '일주일',
    'ONE-MONTH': '1개월',
    'TWO-MONTH': '2개월',
    'THREE-MONTH': '3개월 이상',
  },
  STATUS: {
    APPLY: '지원 완료',
    CANCEL: '지원 취소',
    VIEWED: '열람',
    'NOT-VIEWED': '미열람',
    PASS: '합격',
    FAIL: '불합격',
  },
  PROGRESSION: {
    ING: '진행중',
    CLOSE: '마감',
  },
  REPLY_OR_NOT: REPLY_STATUS_KO,
  POSITION: ['필라테스', '요가'],
  RECRUIT_TYPE: ['전임', '파트타임', '대강', '실장'],
  TIME: ['오전', '오후', '전일', '협의'],
  VIEW: ['최신순', '조회순'],
} as const;

export default FILTER;
