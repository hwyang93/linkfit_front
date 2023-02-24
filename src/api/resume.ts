import request from '@api/request';

export function fetchResumes() {
  return request.get('/resume');
}

export function fetchResume(seq: number) {
  return request.get(`/resume/${seq}`);
}
