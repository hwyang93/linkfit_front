import {
  FetchBookmarkCommunitiesResponse,
  FetchCommunityPostResponse,
  FetchCommunityPostsParams,
  FetchCommunityPostsResponse,
} from '@/types/api/community';
import {CreateCommunityCommentDto, CreateCommunityDto} from '@/types/api/dtos';
import {DeleteResponse, PostResponse} from '@/types/common';
import request from './request';

export const createCommunityPost = (data: CreateCommunityDto) => {
  return request.post<PostResponse>('/community', data);
};

export const fetchCommunityPosts = (params?: FetchCommunityPostsParams) => {
  return request.get<FetchCommunityPostsResponse>('/community', {params});
};

export const fetchCommunityPost = (seq: number) => {
  return request.get<FetchCommunityPostResponse>(`/community/${seq}`);
};

export const fetchBookmarkCommunities = () => {
  return request.get<FetchBookmarkCommunitiesResponse>('/community/bookmark');
};

export const createCommunityComment = (
  seq: number,
  data: CreateCommunityCommentDto,
) => {
  return request.post<PostResponse>(`/community/${seq}/comment`, data);
};

export const createCommunityBookmark = (seq: number) => {
  return request.post<PostResponse>(`/community/${seq}/bookmark`);
};

export const deleteCommunityBookmark = (seq: number) => {
  return request.delete<DeleteResponse>(`/community/${seq}/bookmark`);
};
