import { YesNoFlag } from '../common';
import { CommonFileEntity, MemberLinkEntity, ResumeEntity, ReviewEntity } from './entities.type';

export interface FetchInstructorsParams {
  noPaging?: boolean;
  curPage?: number;
  perPage?: number;
  fields?: string[];
}

export type Instructor = {
  seq: number;
  name: string;
  nickname: string;
  field: string;
  address: string;
  career: string;
  followerCount: number;
  isFollow: YesNoFlag;
  profileImage: CommonFileEntity | null;
};

export type FetchInstructorsResponse = Instructor[];

export interface FetchInstructorResponse {
  seq: number;
  name: string;
  nickname: string;
  address: string;
  intro: string;
  field: string;
  career: string;
  links: MemberLinkEntity[];
  follower: string;
  reputations: ReviewEntity[];
}

export type FetchRecommendedInstructorsResponse = {
  seq: number;
  name: string;
  nickname: string;
  regionAuth: {
    region1depth: string;
    region2depth: string;
    region3depth: string;
  };
  profileImage: CommonFileEntity | null;
  resumes: ResumeEntity[];
  address: string;
  career: string;
  followerCount: number;
  isFollow: YesNoFlag;
}[];
