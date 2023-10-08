import { FetchResumeResponse, FetchResumesResponse } from '@/types/api/resume.type';
import request from '@api/request';

export const fetchResumes = () => {
  return request.get<FetchResumesResponse>('/resume');
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
    const response = await request.post(`${ENDPOINT}`, data);
    return response.data;
  },
  updateResumeMaster: async (resumeId: number) => {
    const response = await request.patch(`${ENDPOINT}/master/${resumeId}`);
    return response.data;
  },
  deleteResume: async (resumeId: number) => {
    const response = await request.delete(`${ENDPOINT}/${resumeId}`);
    return response.data;
  },
};
