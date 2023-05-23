import {YesNoFlag} from '../common';
import {
  CompanyEntity,
  MemberEntity,
  MemberLicenceEntity,
  MemberLinkEntity,
} from './entities';

export interface FetchMemberFollowingsParams {
  type: 'COMPANY' | 'INSTRUCTOR';
}

export interface FetchMemberFollowingsResponse {
  createdAt: string;
  updatedAt: string;
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  followingMember: MemberEntity;
  career: string;
}
[];

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
