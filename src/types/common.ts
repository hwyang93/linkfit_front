import {AxiosResponse} from 'axios';

export type MemberType = 'PUBLIC' | 'INSTRUCTOR' | 'COMPANY';

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

export type Coordinate = {
  x: number;
  y: number;
};
