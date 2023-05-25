import {YesNoFlag} from '../common';

export interface CreateRecruitDateDto {
  day: string;
  time: string;
}

export interface CreateRecruitDto {
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
  lon: number;
  lat: number;
  dates: CreateRecruitDateDto[];
}

export interface CreateRecruitApplyDto {
  recruitSeq: number;
  recruitDateSeq: number[];
  resumeSeq: number;
}

export interface CancelRecruitApplyDto {
  seqs: number[];
}

export type UpdateRecruitDto = Partial<CreateRecruitDto>;

export interface UpdateRecruitApplyDto {
  status: string;
}

export interface CreateCompanyDto {
  companyName: string;
  businessNumber: string;
  field: string;
  address: string;
  addressDetail: string;
  phone: string;
  owner: string;
  lon: number;
  lat: number;
}

export interface CreateMemberDto {
  email: string;
  password: string;
  name: string;
  birth: string;
  gender: string;
  phone: string;
  type: string;
  nickname: string;
  address: string;
  addressDetail: string;
  company: CreateCompanyDto;
}

export type UpdateMemberDto = Partial<CreateMemberDto>;

export interface UpdateMemberLinkDto {
  seq: number;
  type: string;
  url: string;
}

export interface UpdateMemberProfileDto {
  nickname: string;
  intro: string;
  field: string;
  links: UpdateMemberLinkDto[];
}

export interface CreateMemberLicenceDto {
  field: string;
  licenceNumber: string;
  issuer: string;
  file: {
    description?: string;
    // TODO: 타입 화인
  };
}

export interface UpdatePositionSuggestDto {
  status: string;
}

export interface CreateRegionAuthDto {
  lon: number;
  lat: number;
  region1depth: string;
  region2depth: string;
  region3depth: string;
}

export interface CreateMemberReputationDto {
  recruitSeq: number;
  comment: string;
  evaluationMemberSeq: number;
  targetMemberSeq: number;
}

export interface UpdateMemberReputationDto {
  comment: string;
}

export interface CreateCareerDto {
  companyName: string;
  startDate: string;
  endDate: string;
  workType: string;
  field: string;
  content: string;
}

export interface CreateEducationDto {
  school: string;
  major: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface CreateResumeDto {
  title: string;
  name: string;
  birth: string;
  address: string;
  addressDetail: string;
  intro: string;
  hopePay: string;
  hopeArea: string;
  hopeTime: string;
  hopeWorkType: string;
  isMaster: YesNoFlag;
  isOpen: YesNoFlag;
  careers: CreateCareerDto[];
  educations: CreateEducationDto[];
}

export type UpdateResumeDto = Partial<CreateResumeDto>;

export interface UpdateResumeMasterDto {
  isOpen: YesNoFlag;
}

export interface CreateinstructorSuggestDto {
  title: string;
  contents: string;
  recruitSeq: number;
  closingDate: string;
  targetMemberSeq: number;
}

export interface CreateCommunityDto {
  category: string;
  title: string;
  contents: string;
}

export interface CreateCommunityCommentDto {
  contents: string;
}

export interface UpdateCommunityDto {}
