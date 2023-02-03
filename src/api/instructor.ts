import request from './request';

export function fetchInstructors() {
  return request.get('/instructor');
}

export function fetchInstructor(seq: number) {
  return request.get(`/instructor/${seq}`);
}
