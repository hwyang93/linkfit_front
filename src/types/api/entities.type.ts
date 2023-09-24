import { MemberType, YesNoFlag } from '../common';

export interface BaseEntity {
  createdAt: string;
  updatedAt: string;
}

export interface CommonFileEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  originFileName: string;
  originFileUrl: string;
  thumbnailFileUrl: string;
}

export interface CompanyEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  companyName: string;
  businessNumber: string;
  field: string;
  address: string;
  addressDetail: string;
  phone: string;
  owner: string;
  intro?: string;
  lon: string;
  lat: string;
  member: MemberEntity;
  isFollow: YesNoFlag;
}

export interface MemberEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  email: string;
  password: string;
  name: string;
  birth: string;
  gender: string;
  phone: string;
  type?: MemberType;
  nickname?: string;
  intro?: string;
  address?: string;
  addressDetail?: string;
  lastLogin?: string;
  isOpenProfile?: YesNoFlag;
  field?: string;
  status?: string;
  profileFileSeq?: number;
  isVerification?: YesNoFlag;
  profileImage?: CommonFileEntity;
  company?: CompanyEntity;
  links: MemberLinkEntity[];
  regionAuth: RegionAuthEntity;
  resumes: ResumeEntity[];
  recruits: RecruitEntity[];
  licences: MemberLicenceEntity[];
  follower: MemberFavoriteEntity[];
  followerCount: number;
  career?: string;
}

export interface MemberLinkEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  type: string;
  url: string;
  member: MemberEntity;
}

export interface MemberAlbumEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  image: CommonFileEntity;
}

export interface MemberBlockEntity extends BaseEntity {
  seq: number;
  member: MemberEntity;
  targetMember: MemberEntity;
}

export interface MemberFavoriteEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  followingMember: MemberEntity;
}

export interface MemberLicenceEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  field: string;
  licenceNumber: string;
  issuer: string;
  status: string;
  licenceFileSeq?: number;
  licenceFile?: CommonFileEntity;
  member?: MemberEntity;
}

export interface RegionAuthEntity extends BaseEntity {
  memberSeq: number;
  lon: number;
  lat: number;
  region1depth: string;
  region2depth: string;
  region3depth: string;
  member?: MemberEntity;
}

export interface ResumeEntity extends BaseEntity {
  seq: number;
  title: string;
  name: string;
  birth: string;
  address: string;
  addressDetail: string;
  intro: string;
  hopePay: string;
  hopeArea: string;
  hopeWorkType: string;
  isMaster: YesNoFlag;
  isOpen: YesNoFlag;
  writerSeq: number;
  licenceSeq: number;
  careers: CareerEntity[];
  educations: EducationEntity[];
  licence: MemberLicenceEntity;
  writer: MemberEntity;
  isSelected: boolean;
}

export interface CareerEntity extends BaseEntity {
  seq: number;
  companyName: string;
  startDate: string;
  endDate?: string;
  workType: string;
  field: string;
  content?: string;
  resumeSeq: number;
  writerSeq: number;
  resume: ResumeEntity;
}

export interface MemberReputationEntity extends BaseEntity {
  seq: number;
  type: string;
  score: number;
  comment: string;
  evaluationMemberSeq: number;
  targetMemberSeq: number;
  evaluationMember: MemberEntity;
  targetMember: MemberEntity;
}

export interface EducationEntity extends BaseEntity {
  seq: number;
  school: string;
  major: string;
  startDate: string;
  endDate?: string;
  status: string;
  resumeSeq: number;
  writerSeq: number;
  resume: ResumeEntity;
}

export interface CommunityCommentEntity extends BaseEntity {
  seq: number;
  contents: string;
  communitySeq: number;
  writerSeq: number;
  community: CommunityCommentEntity;
  writer: MemberEntity;
}

export interface CommunityFavoriteEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  community: CommunityEntity;
}

export interface CommunityEntity extends BaseEntity {
  seq: number;
  communitySeq?: number;
  category: string;
  title: string;
  contents: string;
  writer: MemberEntity;
  viewCount: number;
  writerSeq: number;
  writerType: string;
  writerCompanyName: string;
  writerName: string;
  comments: CommunityCommentEntity[];
  commentsLength: number;
  bookmarks: CommunityFavoriteEntity[];
  isBookmark: YesNoFlag;
  bookmarkCount: number;
}

export interface CsEntity extends BaseEntity {
  seq: number;
  type: string;
  title: string;
  writerSeq: number;
  content: string;
}

export interface InquiryEntity extends BaseEntity {
  seq: number;
  writerSeq: number;
  title: string;
  contents: string;
  answers?: InquiryAnswerEntity[];
  writer: MemberEntity;
}

export interface InquiryAnswerEntity extends BaseEntity {
  seq: number;
  type: string;
  content: string;
  inquiry: InquiryEntity;
  writer: MemberEntity;
}

export interface PositionSuggestEntity extends BaseEntity {
  seq: number;
  writerSeq: number;
  title: string;
  contents: string;
  recruitSeq?: number;
  closingDate?: string;
  suggestMemberSeq: number;
  targetMemberSeq: number;
  status: string;
  writer: MemberEntity;
  recruit?: RecruitEntity;
}

export interface RecruitDateEntity extends BaseEntity {
  seq: number;
  day: string;
  time: string;
  isSelected: boolean;
  isApplied: boolean;
  recruitSeq: number;
  recruit: RecruitEntity;
}

export interface RecruitFavoriteEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  recruit: RecruitEntity;
}

export interface RecruitEntity extends BaseEntity {
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
  writer?: MemberEntity;
  dates: RecruitDateEntity[];
  bookmarks: RecruitFavoriteEntity[];
  isBookmark: YesNoFlag;
  applyInfo?: RecruitApplyEntity[];
}

export interface RecruitApplyEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
  resumeSeq: number;
  recruitSeq: number;
  recruitDateSeq: number;
  status: string;
  resume?: ResumeEntity;
  recruit: RecruitEntity;
  recruitDate: RecruitDateEntity;
}

export interface SeekDateEntity extends BaseEntity {
  seq: number;
  day: string;
  time: string;
  seek: SeekEntity;
}

export interface SeekEntity extends BaseEntity {
  seq: number;
  companyName: string;
  address: string;
  district: string;
  payType: string;
  pay: string;
  writer: MemberEntity;
  dates: SeekDateEntity[];
}

export interface SeekFavoriteEntity extends BaseEntity {
  seq: number;
  memberSeq: number;
}

export interface InquiryEntity extends BaseEntity {
  seq: number;
  writerSeq: number;
  title: string;
  contents: string;
  status: string;
}
