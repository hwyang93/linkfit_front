import {
  CreateRecruitApplyDto,
  CreateRecruitDto,
  UpdateRecruitApplyDto,
} from '@/types/api/dtos';
import {
  FetchBookmarkRecruitsResponse,
  FetchRecruitApplicationsMyParams,
  FetchRecruitApplicationsMyResponse,
  FetchRecruitApplicationsResponse,
  FetchRecruitResponse,
  FetchRecruitsParams,
  FetchRecruitsResponse,
} from '@/types/api/recruit';
import {DeleteResponse, PostResponse} from '@/types/common';
import request from './request';

export function createRecruit(data: CreateRecruitDto) {
  return request.post<PostResponse>('/recruit', data);
}

export function fetchRecruit(seq: number) {
  return request.get<FetchRecruitResponse>(`/recruit/${seq}`);
}

export function fetchRecruits(params?: FetchRecruitsParams) {
  return request.get<FetchRecruitsResponse>('/recruit', {params});
}

export function fetchBookmarkRecruits() {
  return request.get<FetchBookmarkRecruitsResponse>('/recruit/bookmark');
}

export function createRecruitBookmark(seq: number) {
  return request.post<PostResponse>(`/recruit/${seq}/bookmark`);
}

export function deleteRecruitBookmark(seq: number) {
  return request.delete<DeleteResponse>(`/recruit/${seq}/bookmark`);
}

export function createRecruitApply(seq: number, data: CreateRecruitApplyDto) {
  return request.post<PostResponse>(`/recruit/${seq}/apply`, data);
}

// TODO: Response 타입 추가
export function updateRecruitApplyCancel(data: {seqs: number[]}) {
  return request.patch('/recruit/apply', data);
}

export function fetchRecruitApplicationsMy(
  params?: FetchRecruitApplicationsMyParams,
) {
  return request.get<FetchRecruitApplicationsMyResponse>('/recruit/apply', {
    params,
  });
}

export function fetchRecruitApplications(seq: number) {
  return request.get<FetchRecruitApplicationsResponse>(`/recruit/${seq}/apply`);
}

export function fetchRecruitApplication(seq: number) {
  return request.get(`/recruit/apply/${seq}`);
}

// TODO: Response 타입 추가
export function updateRecruitApplyStatus(
  seq: number,
  data: UpdateRecruitApplyDto,
) {
  return request.patch(`/recruit/${seq}/apply`, data);
}

// TODO: Response 타입 추가
export function fetchRecommendedRecruits() {
  return request.get('/recruit/recommended');
}
