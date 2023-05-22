import {CompanyEntity, RecruitApplyEntity, RecruitEntity} from './entities';

export type FetchRecruitsParams = {
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
};

export type FetchRecruitsResponse = {
  createdAt: string;
  updatedAt: string;
  seq: number;
  title: string;
  companyName: string;
  position: string;
  address: string;
  addressDetail: string;
  district: string;
  phone: string;
  recruitType: string;
  career: string;
  education: string;
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
    profileImage: null;
    company: CompanyEntity;
  };
}[];

export type FetchRecruitApplicationsMyResponse = {
  recruit: RecruitEntity;
  recruitApply: RecruitApplyEntity[];
};
