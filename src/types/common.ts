import {AxiosResponse} from 'axios';

export type YesNoFlag = 'Y' | 'N';

export type PostResponse = {
  seq: number;
};

export type DeleteResponse = {
  seq: number;
};

export interface AxiosResponseWithPagingInfo<T> extends AxiosResponse<T> {
  pagingInfo?: {
    curPage: string;
    perPage: string;
  };
}

export type FilterState = {
  label: string;
  value: string;
};

export type ReplyOrNotFilter =
  | '답변 대기중'
  | '답변 수락'
  | '답변 거절'
  | '제안 마감';
export type PeriodFilter = '일주일' | '1개월' | '2개월' | '3개월 이상';
export type StatusFilter =
  | '지원 완료'
  | '지원 취소'
  | '열람'
  | '합격'
  | '불합격';

export type Coordinate = {
  x: number;
  y: number;
};
