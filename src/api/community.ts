import request from './request';

export function fetchBookmarkCommunities() {
  return request.get('/community/bookmark');
}
