import {
  CreateMemberDto,
  CreateMemberReputationDto,
  CreateRegionAuthDto,
  ResetPasswordDto,
  UpdateMemberReputationDto,
  UpdatePositionSuggestDto,
} from '@/types/api/dtos.type';
import {
  FetchCheckNicknameResponse,
  FetchMemberFollowingsParams,
  FetchMemberFollowingsResponse,
  FetchMemberInfoByEmailResponse,
  FetchMemberInfoBySeqResponse,
  FetchMemberInfoResponse,
  FetchMemberLicencesResponse,
  FetchMemberMyInfoResponse,
  FetchMemberReputationsResponse,
  FetchPositionSuggestResponse,
  FetchReceivePositionSuggestsParams,
  FetchReceivePositionSuggestsResponse,
  FetchRecruitByMemberResponse,
  FetchRegionAuthResponse,
  FetchSendPositionSuggestsParams,
  FetchSendPositionSuggestsResponse,
} from '@/types/api/member.type';
import { DeleteResponse, PostResponse } from '@/types/common';
import request from './request';

export const createMember = (data: CreateMemberDto) => {
  return request.post<PostResponse>('/member', data);
};

export const fetchMemberInfo = () => {
  return request.get<FetchMemberInfoResponse>('/member');
};

export const fetchMemberInfoByEmail = (email: string) => {
  return request.get<FetchMemberInfoByEmailResponse>(`/member/check/email/${email}`);
};

export const fetchCheckNickname = (nickname: string) => {
  return request.get<FetchCheckNicknameResponse>(`/member/check/nickname/${nickname}`);
};

export const fetchMemberMyInfo = () => {
  return request.get<FetchMemberMyInfoResponse>('/member/my');
};

// TODO: Response 타입 추가
// TODO: data 타입 확인
export const updateProfile = (data: FormData) => {
  return request.patch('/member/profile', data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

export const createRegionAuth = (data: CreateRegionAuthDto) => {
  return request.post<PostResponse>('/member/region', data);
};

export const fetchRegionAuth = () => {
  return request.get<FetchRegionAuthResponse>('/member/region');
};

export const deleteRegionAuth = (seq: number) => {
  return request.delete<DeleteResponse>(`/member/region/${seq}`);
};

export const fetchMemberLicences = () => {
  return request.get<FetchMemberLicencesResponse>('/member/licence');
};

export const createMemberLicence = (data: FormData) => {
  return request.post<PostResponse>('/member/licence', data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};

// TODO: Response 타입 추가
export const cancelMemberLicence = (seq: number) => {
  return request.patch(`/member/licence/${seq}`);
};

export const createReview = (data: CreateMemberReputationDto) => {
  return request.post<PostResponse>('/member/reputation', data);
};

// TODO: Response 타입 추가
export const updateMemberReputation = (seq: number, data: UpdateMemberReputationDto) => {
  return request.patch(`/member/reputation/${seq}`, data);
};

export const fetchReceivePositionSuggests = (params?: FetchReceivePositionSuggestsParams) => {
  return request.get<FetchReceivePositionSuggestsResponse>('/member/suggest/to', { params });
};

export const fetchSendPositionSuggests = (params?: FetchSendPositionSuggestsParams) => {
  return request.get<FetchSendPositionSuggestsResponse>('/member/suggest/from', { params });
};

export const fetchPositionSuggest = (seq: number) => {
  return request.get<FetchPositionSuggestResponse>(`/member/suggest/${seq}`);
};

// TODO: Response 타입 추가
export const updatePositionSuggestStatus = (seq: number, data: UpdatePositionSuggestDto) => {
  return request.patch(`/member/suggest/${seq}`, data);
};

export const fetchMemberFollowings = ({ type }: FetchMemberFollowingsParams) => {
  return request.get<FetchMemberFollowingsResponse>(`/member/following/${type}`);
};

export const fetchMemberInfoBySeq = (seq: number) => {
  return request.get<FetchMemberInfoBySeqResponse>(`/member/${seq}`);
};

export const fetchRecruitByMember = (seq: number) => {
  return request.get<FetchRecruitByMemberResponse>(`/member/${seq}/recruit`);
};

export const updateMemberPassword = (body: UpdateMemberPasswordDto) => {
  return request.patch('member/password', body);
};

const ENDPOINT = '/member';

export const memberApi = {
  getFollowingList: async (params: FetchMemberFollowingsParams) => {
    const response = await request.get<FetchMemberFollowingsResponse>(
      `${ENDPOINT}/following/${params.type}`,
    );
    return response.data;
  },
  getMemberInfo: async () => {
    const response = await request.get<FetchMemberInfoBySeqResponse>(ENDPOINT);
    return response.data;
  },
  getMemberLicenceList: async () => {
    const response = await request.get<FetchMemberLicencesResponse>(`${ENDPOINT}/licence`);
    return response.data;
  },
  checkNickname: async (nickname: string) => {
    const response = await request.get<FetchCheckNicknameResponse>(
      `${ENDPOINT}/check/nickname/${nickname}`,
    );
    return response.data;
  },
  updateProfile: async (body: FormData) => {
    const response = await request.patch(`${ENDPOINT}/profile`, body);
    return response.data;
  },
  getReceivedPositionSuggestionList: async (params: FetchReceivePositionSuggestsParams) => {
    const response = await request.get<FetchReceivePositionSuggestsResponse>(
      `${ENDPOINT}/suggest/to`,
      { params },
    );
    return response.data;
  },
  getReceivedPositionSuggestion: async (suggestionId: number) => {
    const response = await request.get<FetchPositionSuggestResponse>(
      `${ENDPOINT}/suggest/${suggestionId}`,
    );
    return response.data;
  },
  updatePositionSuggestion: async (suggestionId: number, body: UpdatePositionSuggestDto) => {
    const response = await request.patch(`${ENDPOINT}/suggest/${suggestionId}`, body);
    return response.data;
  },
  getReputationList: async () => {
    const response = await request.get<FetchMemberReputationsResponse>(`${ENDPOINT}/reputation`);
    return response.data;
  },
  deleteReputation: async (reputationId: number) => {
    const response = await request.delete<DeleteResponse>(`${ENDPOINT}/reputation/${reputationId}`);
    return response.data;
  },
  unregister: async (memberId: number) => {
    const response = await request.delete<DeleteResponse>(`${ENDPOINT}/${memberId}`);
    return response.data;
  },
  resetPassword: async (body: ResetPasswordDto) => {
    const response = await request.patch(`${ENDPOINT}/password`, body);
    return response.data;
  },
};
