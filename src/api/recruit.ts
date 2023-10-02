import {
  CreateRecruitApplyDto,
  CreateRecruitDto,
  UpdateRecruitApplyDto,
  UpdateRecruitDto,
} from '@/types/api/dtos.type';
import {
  FetchBookmarkRecruitsResponse,
  FetchRecommendedRecruitsResponse,
  FetchRecruitApplicationsMyParams,
  FetchRecruitApplicationsMyResponse,
  FetchRecruitApplicationsResponse,
  FetchRecruitResponse,
  FetchRecruitsParams,
  FetchRecruitsResponse,
} from '@/types/api/recruit.type';
import { DeleteResponse, PostResponse } from '@/types/common';
import request from './request';

export const fetchBookmarkRecruits = () => {
  return request.get<FetchBookmarkRecruitsResponse>('/recruit/bookmark');
};

export const createRecruitBookmark = (seq: number) => {
  return request.post<PostResponse>(`/recruit/${seq}/bookmark`);
};

export const deleteRecruitBookmark = (seq: number) => {
  return request.delete<DeleteResponse>(`/recruit/${seq}/bookmark`);
};

export const createRecruitApply = (seq: number, data: CreateRecruitApplyDto) => {
  return request.post<PostResponse>(`/recruit/${seq}/apply`, data);
};

export const updateRecruitApplyCancel = (data: { seqs: number[] }) => {
  return request.patch('/recruit/apply', data);
};

export const updateRecruitApplyStatus = (seq: number, data: UpdateRecruitApplyDto) => {
  return request.patch(`/recruit/${seq}/apply`, data);
};

const ENDPOINT = '/recruit';

export const recruitApi = {
  getRecruitList: async (params?: FetchRecruitsParams) => {
    const response = await request.get<FetchRecruitsResponse>(ENDPOINT, {
      params,
    });
    return response.data;
  },
  getRecruitById: async (recruitId: number) => {
    const response = await request.get<FetchRecruitResponse>(`${ENDPOINT}/${recruitId}`);
    return response.data;
  },
  createRecruit: async (body: CreateRecruitDto) => {
    const response = await request.post<PostResponse>(ENDPOINT, body);
    return response.data;
  },
  updateRecruit: async ({ recruitId, body }: { recruitId: number; body: UpdateRecruitDto }) => {
    const response = await request.patch<PostResponse>(`${ENDPOINT}/${recruitId}`, body);
    return response.data;
  },
  getApplicationList: async (recruitId: number) => {
    const response = await request.get<FetchRecruitApplicationsResponse>(
      `${ENDPOINT}/${recruitId}/apply`,
    );
    return response.data;
  },
  getMyApplicationList: async (params?: FetchRecruitApplicationsMyParams) => {
    const response = await request.get<FetchRecruitApplicationsMyResponse>(`${ENDPOINT}/apply`, {
      params,
    });
    return response.data;
  },
  getRecommendedRecruitList: async () => {
    const response = await request.get<FetchRecommendedRecruitsResponse>(`${ENDPOINT}/recommended`);
    return response.data;
  },
};
