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

export type PeriodFilter = '일주일' | '1개월' | '2개월' | '3개월 이상';
export type StatusFilter =
  | '지원 완료'
  | '지원 취소'
  | '열람'
  | '합격'
  | '불합격';
