import request from './request';

export function login(data: object) {
  return request.post('/auth/login', data);
}

export function refreshToken() {
  return request.post('/auth/refresh');
}
