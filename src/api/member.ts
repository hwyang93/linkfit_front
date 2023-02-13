import request from './request';

export function createMember(data: object) {
  return request.post('/member', data);
}

export function fetchMemberInfo() {
  return request.get('/member');
}

export function fetchMemberInfoByEmail(email: string) {
  return request.get(`/member/check/email/${email}`);
}

export function fetchMemberMyInfo() {
  return request.get('/member/my');
}

export function editProfile(data: object) {
  return request.patch('/member/profile', data);
}

export function registerRegion(data: object) {
  return request.post('/member/region', data);
}

export function registerReview(data: object) {
  return request.post('/member/reputation', data);
}
