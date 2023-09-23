import { AxiosResponse } from 'axios';

export const Member = {
  Public: 'PUBLIC',
  Instructor: 'INSTRUCTOR',
  Company: 'COMPANY',
  Center: 'CENTER',
} as const;

export type MemberType = (typeof Member)[keyof typeof Member];

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
