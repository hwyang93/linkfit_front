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
  createResume: (data: object) => {
    return request.post(`${ENDPOINT}`, data);
  },
};
