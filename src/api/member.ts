import request from './request';

export function createMember(data: object) {
  return request.post('/member', data);
}

export function fetchMember(params: object) {
  return request.get('/member/', params);
}

export function fetchMemberInfo(seq: number) {
  return request.get(`/member/${seq}`);
}
