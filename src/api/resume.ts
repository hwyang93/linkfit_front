import request from '@api/request';

export function createResume(data: object) {
  return request.post('/resume', data);
}

export function fetchResumes() {
  return request.get('/resume');
}

export function fetchResume(seq: number) {
  return request.get(`/resume/${seq}`);
}

export function updateResumeMaster(seq: number) {
  return request.patch(`/resume/master/${seq}`);
}

export function deleteResume(seq: number) {
  return request.delete(`/resume/${seq}`);
}
