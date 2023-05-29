import {
  FetchBookmarkCommunitiesResponse,
  FetchCommunityPostResponse,
  FetchCommunityPostsParams,
  FetchCommunityPostsResponse,
} from '@/types/api/community';
import {CreateCommunityCommentDto, CreateCommunityDto} from '@/types/api/dtos';
import {DeleteResponse, PostResponse} from '@/types/common';
import request from './request';

export function createCommunityPost(data: CreateCommunityDto) {
  return request.post<PostResponse>('/community', data);
}

export function fetchCommunityPosts(params?: FetchCommunityPostsParams) {
  return request.get<FetchCommunityPostsResponse>('/community', {params});
}

export function fetchCommunityPost(seq: number) {
  return request.get<FetchCommunityPostResponse>(`/community/${seq}`);
}

export function fetchBookmarkCommunities() {
  return request.get<FetchBookmarkCommunitiesResponse>('/community/bookmark');
}

export function createCommunityComment(
  seq: number,
  data: CreateCommunityCommentDto,
) {
  return request.post<PostResponse>(`/community/${seq}/comment`, data);
}

export function createCommunityBookmark(seq: number) {
  return request.post<PostResponse>(`/community/${seq}/bookmark`);
}

export function deleteCommunityBookmark(seq: number) {
  return request.delete<DeleteResponse>(`/community/${seq}/bookmark`);
}
