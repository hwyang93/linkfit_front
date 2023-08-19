import {
  CreateRecruitApplyDto,
  CreateRecruitDto,
  UpdateRecruitApplyDto,
} from '@/types/api/dtos';
import {
  FetchBookmarkRecruitsResponse,
  FetchRecommendedRecruitsResponse,
  FetchRecruitApplicationResponse,
  FetchRecruitApplicationsMyParams,
  FetchRecruitApplicationsMyResponse,
  FetchRecruitApplicationsResponse,
  FetchRecruitResponse,
  FetchRecruitsParams,
  FetchRecruitsResponse,
} from '@/types/api/recruit';
import {DeleteResponse, PostResponse} from '@/types/common';
import request from './request';

export const createRecruit = (body: CreateRecruitDto) => {
  return request.post<PostResponse>('/recruit', body);
};

export const fetchRecruit = (seq: number) => {
  return request.get<FetchRecruitResponse>(`/recruit/${seq}`);
};

export const fetchRecruits = (params?: FetchRecruitsParams) => {
  return request.get<FetchRecruitsResponse>('/recruit', {params});
};

export const fetchBookmarkRecruits = () => {
  return request.get<FetchBookmarkRecruitsResponse>('/recruit/bookmark');
};

export const createRecruitBookmark = (seq: number) => {
  return request.post<PostResponse>(`/recruit/${seq}/bookmark`);
};

export const deleteRecruitBookmark = (seq: number) => {
  return request.delete<DeleteResponse>(`/recruit/${seq}/bookmark`);
};

export const createRecruitApply = (
  seq: number,
  data: CreateRecruitApplyDto,
) => {
  return request.post<PostResponse>(`/recruit/${seq}/apply`, data);
};

export const updateRecruitApplyCancel = (data: {seqs: number[]}) => {
  return request.patch('/recruit/apply', data);
};

export const fetchRecruitApplicationsMy = (
  params?: FetchRecruitApplicationsMyParams,
) => {
  return request.get<FetchRecruitApplicationsMyResponse>('/recruit/apply', {
    params,
  });
};

export const fetchRecruitApplications = (seq: number) => {
  return request.get<FetchRecruitApplicationsResponse>(`/recruit/${seq}/apply`);
};

export const fetchRecruitApplication = (seq: number) => {
  return request.get<FetchRecruitApplicationResponse>(`/recruit/apply/${seq}`);
};

export const updateRecruitApplyStatus = (
  seq: number,
  data: UpdateRecruitApplyDto,
) => {
  return request.patch(`/recruit/${seq}/apply`, data);
};

export const fetchRecommendedRecruits = () => {
  return request.get<FetchRecommendedRecruitsResponse>('/recruit/recommended');
};
