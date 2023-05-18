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
    company: {
      companyName: string;
      field: string;
    } | null; // TODO: 타입 확인
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
