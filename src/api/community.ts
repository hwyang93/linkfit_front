import {
  FetchBookmarkCommunitiesResponse,
  FetchCommunityPostResponse,
  FetchCommunityPostsParams,
  FetchCommunityPostsResponse,
} from '@/types/api/community.type';
import {
  CreateCommunityCommentDto,
  CreateCommunityDto,
  UpdateCommunityDto,
} from '@/types/api/dtos.type';
import { DeleteResponse, PostResponse } from '@/types/common';
import request from './request';

export const createCommunityPost = (data: CreateCommunityDto) => {
  return request.post<PostResponse>('/community', data);
};

export const fetchBookmarkCommunities = () => {
  return request.get<FetchBookmarkCommunitiesResponse>('/community/bookmark');
};

export const createCommunityComment = (seq: number, data: CreateCommunityCommentDto) => {
  return request.post<PostResponse>(`/community/${seq}/comment`, data);
};

const ENDPOINT = '/community';

export const communityApi = {
  getPostById: async (postId: number) => {
    const response = await request.get<FetchCommunityPostResponse>(`${ENDPOINT}/${postId}`);
    return response.data;
  },
  getPostList: async (params?: FetchCommunityPostsParams) => {
    const response = await request.get<FetchCommunityPostsResponse>(ENDPOINT, {
      params,
    });
    return response.data;
  },
  updatePostById: async (postId: number, body: UpdateCommunityDto) => {
    const response = await request.put<PostResponse>(`${ENDPOINT}/${postId}`, body);
    return response.data;
  },
  deletePostById: async (postId: number) => {
    const response = await request.delete(`${ENDPOINT}/${postId}`);
    return response.data;
  },
  getBookmarkList: async () => {
    const response = await request.get<FetchBookmarkCommunitiesResponse>(`${ENDPOINT}/bookmark`);
    return response.data;
  },
  createBookmark: async (postId: number) => {
    const response = await request.post<PostResponse>(`${ENDPOINT}/${postId}/bookmark`);
    return response.data;
  },
  deleteBookmark: async (postId: number) => {
    const response = await request.delete<DeleteResponse>(`${ENDPOINT}/${postId}/bookmark`);
    return response.data;
  },
};
