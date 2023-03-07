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
  return request.patch('/member/profile', data, {
    headers: {'content-type': 'multipart/form-data'},
  });
}

export function createRegionAuth(data: object) {
  return request.post('/member/region', data);
}

export function fetchRegionAuth() {
  return request.get('/member/region');
}

export function fetchMemberLicences() {
  return request.get('/member/licence');
}

export function createMemberLicence(data: object) {
  return request.post('/member/licence', data, {
    headers: {'content-type': 'multipart/form-data'},
  });
}

export function cancelMemberLicence(seq: number) {
  return request.patch(`/member/licence/${seq}`);
}

export function fetchMemberReputations() {
  return request.get('/member/reputation');
}

export function createReview(data: object) {
  return request.post('/member/reputation', data);
}

export function updateMemberReputation(seq: number, data: object) {
  return request.patch(`/member/reputation/${seq}`, data);
}

export function deleteMemberReputation(seq: number) {
  return request.delete(`/member/reputation/${seq}`);
}

export function fetchReceivePositionSuggests() {
  return request.get('/member/suggest/to');
}

export function fetchSendPositionSuggests() {
  return request.get('/member/suggest/from');
}

export function fetchPositionSuggest(seq: number) {
  return request.get(`/member/suggest/${seq}`);
}

export function updatePositionSuggestStatus(seq: number, data: object) {
  return request.patch(`/member/suggest/${seq}`, data);
}
