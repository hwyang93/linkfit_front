import {RecruitApplyEntity, RecruitEntity} from './entities';

export interface FetchRecruitsParams {
  noPaging?: boolean;
  curPage?: number;
  perPage?: number;
  type?: 'list' | 'marker';
  fields?: string[];
  recruitTypes?: string[];
  area?: string;
  isWriter?: boolean;
  status?: string;
  period?: string;
}

export type FetchRecruitsResponse = RecruitEntity[];

export interface FetchRecruitApplicationsResponse {
  recruit: RecruitEntity;
  recruitApply: RecruitApplyEntity[];
}

export type FetchRecruitResponse = RecruitEntity;

export interface FetchBookmarkRecruitsResponse {
  createdAt: string;
  updatedAt: string;
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  recruit: RecruitEntity;
}
[];

export interface FetchRecruitApplicationsMyParams {
  period?: string;
  status?: string;
}

export type FetchRecruitApplicationsMyResponse = RecruitApplyEntity[];
