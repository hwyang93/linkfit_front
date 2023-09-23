import { CreateinstructorSuggestDto } from '@/types/api/dtos';
import {
  FetchInstructorResponse,
  FetchInstructorsParams,
  FetchInstructorsResponse,
  FetchRecommendedInstructorsResponse,
} from '@/types/api/instructor';
import { AxiosResponseWithPagingInfo, PostResponse } from '@/types/common';
import request from './request';

// TODO: data 바깥 타입 지정하는 방법 찾아보기
export const fetchInstructors = (
  params?: FetchInstructorsParams,
): Promise<AxiosResponseWithPagingInfo<FetchInstructorsResponse>> => {
  return request.get<FetchInstructorsResponse>('/instructor', { params });
};

export const fetchInstructor = (seq: number) => {
  return request.get<FetchInstructorResponse>(`/instructor/${seq}`);
};

export const createInstructorSuggest = (data: CreateinstructorSuggestDto) => {
  return request.post<PostResponse>('/instructor/suggest', data);
};

export const fetchRecommendedInstructors = () => {
  return request.get<FetchRecommendedInstructorsResponse>('/instructor/recommended');
};

const ENDPOINT = '/instructor';

export const instructorApi = {
  getInstructorList: async (params?: FetchInstructorsParams) => {
    const response = await request.get<FetchInstructorsResponse>(`${ENDPOINT}`, {
      params,
    });
    return response.data;
  },
  followInstructor: async (instructorId: number) => {
    const response = await request.post<PostResponse>(`${ENDPOINT}/follow/${instructorId}`);
    return response.data;
  },
  unfollowInstructor: async (instructorId: number) => {
    const response = await request.delete<PostResponse>(`${ENDPOINT}/follow/${instructorId}`);
    return response.data;
  },
};
