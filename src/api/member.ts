import {
  CreateMemberDto,
  CreateRegionAuthDto,
  UpdateMemberPasswordDto,
  UpdatePositionSuggestDto,
} from '@/types/api/dtos.type';
import {
  CreateMemberPortfolioBody,
  FetchCheckNicknameResponse,
  FetchMemberFollowingsParams,
  FetchMemberFollowingsResponse,
  FetchMemberInfoByEmailResponse,
  FetchMemberInfoBySeqResponse,
  FetchMemberInfoResponse,
  FetchMemberLicencesResponse,
  FetchMemberMyInfoResponse,
  FetchPositionSuggestResponse,
  FetchReceivePositionSuggestsParams,
  FetchReceivePositionSuggestsResponse,
  FetchRegionAuthResponse,
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

export const fetchMemberMyInfo = () => {
  return request.get<FetchMemberMyInfoResponse>('/member/my');
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

export const cancelMemberLicence = (seq: number) => {
  return request.patch(`/member/licence/${seq}`);
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
  unregister: async (memberId: number) => {
    const response = await request.delete<DeleteResponse>(`${ENDPOINT}/${memberId}`);
    return response.data;
  },
  updateMemberPassword: async (body: UpdateMemberPasswordDto) => {
    const response = await request.patch(`${ENDPOINT}/password`, body);
    return response.data;
  },
  follow: async (memberId: number) => {
    const response = await request.post<PostResponse>(`${ENDPOINT}/follow/${memberId}`);
    return response.data;
  },
  unfollow: async (memberId: number) => {
    const response = await request.delete<DeleteResponse>(`${ENDPOINT}/follow/${memberId}`);
    return response.data;
  },
  getPortfolioList: async () => {
    const response = await request.get(`${ENDPOINT}/portfolio`);
    return response.data;
  },
  createPortfolio: async (body: CreateMemberPortfolioBody) => {
    const response = await request.post<PostResponse>(`${ENDPOINT}/portfolio`, body);
    return response.data;
  },
};
