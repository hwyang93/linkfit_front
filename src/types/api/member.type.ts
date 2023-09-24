import { MemberType, YesNoFlag } from '../common';
import {
  CompanyEntity,
  MemberEntity,
  MemberLicenceEntity,
  MemberLinkEntity,
  PositionSuggestEntity,
  RecruitEntity,
  RegionAuthEntity,
  ResumeEntity,
} from './entities.type';

export interface FetchMemberFollowingsParams {
  type: MemberType;
}

export type FetchMemberFollowingsResponse = {
  createdAt: string;
  updatedAt: string;
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  followingMember: MemberEntity;
  career: string;
}[];

export interface FetchMemberInfoResponse {
  createdAt: string;
  updatedAt: string;
  seq: number;
  email: string;
  name: string;
  birth: string;
  gender: string;
  phone: string;
  type: string; // TODO: 타입 확인
  nickname: string;
  intro: string;
  address: string;
  addressDetail: string;
  lastLogin: string;
  isOpenProfile: YesNoFlag; // TODO: 타입 확인
  field: string;
  status: string; // TODO: 타입 확인
  profileFileSeq: number;
  isVerification: YesNoFlag;
  company: CompanyEntity;
  links: MemberLinkEntity[];
  licences: MemberLicenceEntity[];
  profileImage: {
    createdAt: string;
    updatedAt: string;
    seq: number;
    memberSeq: number;
    originFileName: string;
    originFileUrl: string;
    thumbnailFileUrl: string;
  };
  followerCount: number;
  career: string | null; // TODO: 타입 확인
}

export interface FetchMemberInfoByEmailResponse {
  seq: number;
}

export interface FetchCheckNicknameResponse {
  duplication: boolean;
}

export interface FetchMemberMyInfoResponse {
  memberInfo: MemberEntity;
  masterResume: ResumeEntity;
  applyCountInfo: {
    totalApplyCount: string;
    passApplyCount: string;
    failApplyCount: string;
    cancelApplyCount: string;
  };
  suggestCountInfo: {
    totalSuggestCount: string;
    waitingSuggestCount: string;
    completedSuggestCount: string;
    closedSuggestCount: string;
  };
  noticeCountInfo: {
    totalNoticeCount: string;
    recruitCount: string;
    seekCount: string;
  };
}

export type FetchRegionAuthResponse = RegionAuthEntity;

export type FetchMemberLicencesResponse = MemberLicenceEntity[];

export interface FetchSendPositionSuggestsParams {
  period?: string;
  status?: string;
}

export type FetchSendPositionSuggestsResponse = PositionSuggestEntity[];

export interface FetchReceivePositionSuggestsParams {
  period?: string;
  status?: string;
}

export type FetchReceivePositionSuggestsResponse = PositionSuggestEntity[];

export type FetchPositionSuggestResponse = PositionSuggestEntity;

export type FetchMemberInfoBySeqResponse = MemberEntity;

export type FetchRecruitByMemberResponse = RecruitEntity[];

export type UpdateProfileBody = {
  nickname: string;
  intro: string;
  field: string;
  imageObj?: { uri?: string; name?: string; type?: string };
};
