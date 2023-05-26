import {YesNoFlag} from '../common';
import {MemberLinkEntity, MemberReputationEntity} from './entities';

export interface FetchInstructorsParams {
  noPaging?: boolean;
  curPage?: number;
  perPage?: number;
  fields?: string;
}

export interface FetchInstructorsResponse {
  seq: number;
  name: string;
  nickname: string;
  field: string;
  address: string;
  career: string;
  followerCount: number;
  isFollow: YesNoFlag;
}
[];

export interface FetchInstructorResponse {
  seq: number;
  name: string;
  nickname: string;
  address: string;
  intro: string;
  career: string;
  links: MemberLinkEntity[];
  follower: string;
  reputations: MemberReputationEntity[];
}
