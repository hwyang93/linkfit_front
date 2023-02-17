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

export function fetchCheckNickname(nickname: string) {
  return request.get(`/member/check/nickname/${nickname}`);
}

export function fetchMemberMyInfo() {
  return request.get('/member/my');
}

export function updateProfile(data: object) {
  return request.patch('/member/profile', data);
}

export function createRegionAuth(data: object) {
  return request.post('/member/region', data);
}

export function fetchRegionAuth() {
  return request.get('/member/region');
}

export function createReview(data: object) {
  return request.post('/member/reputation', data);
}
