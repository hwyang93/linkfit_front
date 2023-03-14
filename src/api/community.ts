import request from './request';

export function fetchCommunityPosts(params: object) {
  return request.get('/community', params);
}

export function fetchCommunityPost(seq: number) {
  return request.get(`/community/${seq}`);
}

export function fetchBookmarkCommunities() {
  return request.get('/community/bookmark');
}
