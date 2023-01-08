import request from './request';

export function newMember(data: string) {
  return request.post('/member', data);
}

export function fetchMember(member_seq: number) {
  return request.get(`/member/${member_seq}`);
}
