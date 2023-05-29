import {CreateinstructorSuggestDto} from '@/types/api/dtos';
import {
  FetchInstructorResponse,
  FetchInstructorsParams,
  FetchInstructorsResponse,
} from '@/types/api/instructor';
import {AxiosResponseWithPagingInfo, PostResponse} from '@/types/common';
import request from './request';

// TODO: data 바깥 타입 지정하는 방법 찾아보기
export const fetchInstructors = (
  params?: FetchInstructorsParams,
): Promise<AxiosResponseWithPagingInfo<FetchInstructorsResponse>> => {
  return request.get<FetchInstructorsResponse>('/instructor', {params});
};

export const fetchInstructor = (seq: number) => {
  return request.get<FetchInstructorResponse>(`/instructor/${seq}`);
};

export const createInstructorSuggest = (data: CreateinstructorSuggestDto) => {
  return request.post<PostResponse>('/instructor/suggest', data);
};

// TODO: fetchRecommendedInstructors Response 타입 추가
export const fetchRecommendedInstructors = () => {
  return request.get('/instructor/recommended');
};
