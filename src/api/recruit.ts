import {FetchRecruitsParams, FetchRecruitsResponse} from '@/types/api/recruit';
import request from './request';

export function createRecruit(data: object) {
  return request.post('/recruit', data);
}

export function fetchRecruit(seq: number) {
  return request.get(`/recruit/${seq}`);
}

export function fetchRecruits(params: FetchRecruitsParams) {
  return request.get<FetchRecruitsResponse>('/recruit', {params});
}

export function fetchBookmarkRecruits() {
  return request.get('/recruit/bookmark');
}

export function createRecruitBookmark(seq: number) {
  return request.post(`/recruit/${seq}/bookmark`);
}

export function deleteRecruitBookmark(seq: number) {
  return request.delete(`/recruit/${seq}/bookmark`);
}

export function createRecruitApply(seq: number, data: object) {
  return request.post(`/recruit/${seq}/apply`, data);
}

export function updateRecruitApplyCancel(data: object) {
  return request.patch('/recruit/apply', data);
}

export function fetchRecruitApplicationsMy() {
  return request.get('/recruit/apply');
}

export function fetchRecruitApplications(seq: number) {
  return request.get(`/recruit/${seq}/apply`);
}

export function fetchRecruitApplication(seq: number) {
  return request.get(`/recruit/apply/${seq}`);
}

export function updateRecruitApplyStatus(seq: number, data: object) {
  return request.patch(`/recruit/${seq}/apply`, data);
}

export function fetchRecommendedRecruits() {
  return request.get('/recruit/recommended');
}
