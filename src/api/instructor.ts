import request from './request';

export function fetchInstructors() {
  return request.get('/instructor');
}

export function fetchInstructor(seq: number) {
  return request.get(`/instructor/${seq}`);
}

export function createInstructorSuggest(data: object) {
  return request.post('/instructor/suggest', data);
}

export function fetchRecommendedInstructors() {
  return request.get('/instructor/recommended');
}
