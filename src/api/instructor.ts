import request from './request';

export function fetchInstructors() {
  return request.get('/instructor');
}
