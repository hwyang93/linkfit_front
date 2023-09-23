import { YesNoFlag } from '../common';
import { CommonFileEntity, CompanyEntity, RecruitApplyEntity, RecruitEntity } from './entities';

export const RecruitStatus = {
  Applied: 'APPLY',
  Processing: 'PROCESS',
  Approved: 'APPROVAL',
  Canceled: 'CANCEL',
  Waiting: 'WAITING',
  Passed: 'PASS',
} as const;

export type RecruitStatusType = (typeof RecruitStatus)[keyof typeof RecruitStatus];

export interface FetchRecruitsParams {
  noPaging?: boolean;
  curPage?: number;
  perPage?: number;
  type?: 'list' | 'marker';
  fields?: string[];
  time?: string[];
  recruitTypes?: string[];
  area?: string;
  isWriter?: YesNoFlag;
  status?: string;
  period?: string;
}

export type FetchRecruitsResponse = RecruitEntity[];

export interface FetchRecruitApplicationsResponse {
  recruit: RecruitEntity;
  recruitApply: RecruitApplyEntity[];
}

export type FetchRecruitResponse = RecruitEntity;

export type FetchBookmarkRecruitsResponse = {
  createdAt: string;
  updatedAt: string;
  favoriteSeq: number;
  memberSeq: number;
  seq: number;
  recruit: RecruitEntity;
}[];

export interface FetchRecruitApplicationsMyParams {
  period?: string;
  status?: string;
}

export type FetchRecruitApplicationsMyResponse = RecruitApplyEntity[];

export type FetchRecruitApplicationResponse = RecruitApplyEntity;

export type FetchRecommendedRecruitsResponse = {
  createdAt: string;
  updatedAt: string;
  seq: 1;
  title: string;
  companyName: string;
  position: string;
  address: string;
  addressDetail: string;
  district: string;
  phone: string;
  recruitType: string;
  career: string;
  payType: string;
  pay: string;
  classType: string;
  content: string;
  status: string;
  lon: number;
  lat: number;
  writerSeq: number;
  writer: {
    name: string;
    profileImage: CommonFileEntity | null;
    company: CompanyEntity | null;
  };
}[];
