import { CreateinstructorSuggestDto } from '@/types/api/dtos.type';
import {
  FetchInstructorResponse,
  FetchInstructorsParams,
  FetchInstructorsResponse,
} from '@/types/api/instructor.type';
import { PostResponse } from '@/types/common';
import request from './request';

export const createInstructorSuggest = (data: CreateinstructorSuggestDto) => {
  return request.post<PostResponse>('/instructor/suggest', data);
};

const ENDPOINT = '/instructor';

export const instructorApi = {
  getInstructorList: async (params?: FetchInstructorsParams) => {
    const response = await request.get<FetchInstructorsResponse>(`${ENDPOINT}`, {
      params,
    });
    return response.data;
  },
  getInstructor: async (instructorId: number) => {
    const response = await request.get<FetchInstructorResponse>(`${ENDPOINT}/${instructorId}`);
    return response.data;
  },
};
