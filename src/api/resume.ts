import request from '@api/request';

export const createResume = (data: object) => {
  return request.post('/resume', data);
};

export const fetchResumes = () => {
  return request.get('/resume');
};

export const fetchResume = (seq: number) => {
  return request.get(`/resume/${seq}`);
};

export const updateResumeMaster = (seq: number) => {
  return request.patch(`/resume/master/${seq}`);
};

export const deleteResume = (seq: number) => {
  return request.delete(`/resume/${seq}`);
};
