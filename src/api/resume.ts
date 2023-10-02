import { FetchResumeResponse, FetchResumesResponse } from '@/types/api/resume.type';
import request from '@api/request';

export const createResume = (data: object) => {
  return request.post('/resume', data);
};

export const fetchResumes = () => {
  return request.get<FetchResumesResponse>('/resume');
};

export const fetchResume = (seq: number) => {
  return request.get<FetchResumeResponse>(`/resume/${seq}`);
};

export const updateResumeMaster = (seq: number) => {
  return request.patch(`/resume/master/${seq}`);
};

export const deleteResume = (seq: number) => {
  return request.delete(`/resume/${seq}`);
};

const ENDPOINT = '/resume';

export const resumeApi = {
  getResumeList: async () => {
    const response = await request.get<FetchResumesResponse>(`${ENDPOINT}`);
    return response.data;
  },
  getResume: async (resumeId: number) => {
    const response = await request.get<FetchResumeResponse>(`${ENDPOINT}/${resumeId}`);
    return response.data;
  },
  createResume: async (data: object) => {
    const resposne = await request.post(`${ENDPOINT}`, data);
    return resposne.data;
  },
};
