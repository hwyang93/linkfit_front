import request from './request';

export function login(data: object) {
  return request.post('/auth/login', data);
}
