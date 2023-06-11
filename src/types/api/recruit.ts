import {YesNoFlag} from '../common';
import {RecruitApplyEntity, RecruitEntity} from './entities';

export interface FetchRecruitsParams {
  noPaging?: boolean;
  curPage?: number;
  perPage?: number;
  type?: 'list' | 'marker';
  fields?: string[];
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
