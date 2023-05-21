type CompanyDto = {
  companyName: string;
  field: string;
};

export type FetchMemberFollowingsParams = {
  type: 'COMPANY' | 'INSTRUCTOR';
};

export type FetchMemberFollowingsResponse = {
  createdAt: string;
  updatedAt: string;
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  followingMember: {
    createdAt: string;
    updatedAt: string;
    seq: number;
    email: string;
    name: string;
    birth: string;
    gender: string;
    phone: string;
    type: string;
    nickname: string;
    intro: null; // TODO: 타입 확인
    address: string;
    addressDetail: string;
    lastLogin: string;
    isOpenProfile: 'Y' | 'N'; // TODO; 타입 확인
    field: string;
    status: null; // TODO: 타입 확인
    profileFileSeq: null; // TODO: 타입 확인
    isVerification: 'Y' | 'N'; // TODO: 타입 확인
    company: CompanyDto | null; // TODO: 타입 확인
    profileImage: null; // TODO: 타입 확인
    resumes: {
      createdAt: string;
      updatedAt: string;
      seq: number;
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
      isMaster: 'Y' | 'N'; // TODO: 타입 확인
      isOpen: 'Y' | 'N'; // TODO: 타입 확인
      writerSeq: number;
      licenceSeq: number;
      careers: []; // TODO: 타입 확인
    }[];
    followerCount: string;
  };
  career: string;
}[];

export type FetchMemberInfoResponse = {
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
  isOpenProfile: 'Y' | 'N'; // TODO: 타입 확인
  field: string;
  status: string; // TODO: 타입 확인
  profileFileSeq: number;
  isVerification: 'Y' | 'N';
  company: CompanyDto | null;
  links: {
    createdAt: string;
    updatedAt: string;
    seq: number;
    memberSeq: number;
    type: string;
    url: string;
  }[];
  licences: {
    createdAt: string;
    updatedAt: string;
    seq: number;
    memberSeq: number;
    field: string;
    licenceNumber: string;
    issuer: string;
    status: string; // TODO: 타입 확인
    licenceFileSeq: null; // TODO: 타입 확인
  }[];
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
};
