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

export function editProfile() {
  return request.patch('/member/profile');
}
