import request from './request';

export function createRecruit(data: object) {
  return request.post('/recruit', data);
}

export function fetchRecruit(seq: number) {
  return request.get(`/recruit/${seq}`);
}

export function fetchBookmarkRecruits() {
  return request.get('/recruit/bookmark');
}
