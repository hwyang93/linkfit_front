import request from './request';

export function createCommunityPost(data: object) {
  return request.post('/community', data);
}

export function fetchCommunityPosts(params: object) {
  return request.get('/community', {params});
}

export function fetchCommunityPost(seq: number) {
  return request.get(`/community/${seq}`);
}

export function fetchBookmarkCommunities() {
  return request.get('/community/bookmark');
}

export function createCommunityReply(seq: number, data: object) {
  return request.post(`/community/${seq}/comment`, data);
}
