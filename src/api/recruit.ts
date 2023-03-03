import request from './request';

export function createRecruit(data: object) {
  return request.post('/recruit', data);
}

export function fetchRecruit(seq: number) {
  return request.get(`/recruit/${seq}`);
}

export function fetchRecruits(params: object) {
  return request.get('/recruit', {params});
}

export function fetchBookmarkRecruits() {
  return request.get('/recruit/bookmark');
}

export function fetchRecruitApplicationsMy() {
  return request.get('/recruit/apply');
}

export function fetchRecruitApplications(seq: number) {
  return request.get(`/recruit/${seq}/apply`);
}

export function fetchRecruitApplication(seq: number) {
  return request.get(`/recruit/apply/${seq}`);
}

export function updateRecruitApplyStatus(seq: number, data: object) {
  return request.patch(`/recruit/${seq}/apply`, data);
}
