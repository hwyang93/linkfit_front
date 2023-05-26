import {CreateinstructorSuggestDto} from '@/types/api/dtos';
import {
  FetchInstructorResponse,
  FetchInstructorsParams,
  FetchInstructorsResponse,
} from '@/types/api/instructor';
import {AxiosResponseWithPagingInfo, PostResponse} from '@/types/common';
import request from './request';

export function fetchInstructors(
  params?: FetchInstructorsParams,
): Promise<AxiosResponseWithPagingInfo<FetchInstructorsResponse>> {
  return request.get<FetchInstructorsResponse>('/instructor', {params});
}

export function fetchInstructor(seq: number) {
  return request.get<FetchInstructorResponse>(`/instructor/${seq}`);
}

export function createInstructorSuggest(data: CreateinstructorSuggestDto) {
  return request.post<PostResponse>('/instructor/suggest', data);
}

// TODO: fetchRecommendedInstructors Response 타입 추가
export function fetchRecommendedInstructors() {
  return request.get('/instructor/recommended');
}
