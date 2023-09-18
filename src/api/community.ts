import {
  FetchBookmarkCommunitiesResponse,
  FetchCommunityPostResponse,
  FetchCommunityPostsParams,
  FetchCommunityPostsResponse,
} from '@/types/api/community';
import {
  CreateCommunityCommentDto,
  CreateCommunityDto,
  UpdateCommunityDto,
} from '@/types/api/dtos';
import {DeleteResponse, PostResponse} from '@/types/common';
import request from './request';

export const createCommunityPost = (data: CreateCommunityDto) => {
  return request.post<PostResponse>('/community', data);
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

const ENDPOINT = '/community';

export const communityApi = {
  getPostById: async (postId: number) => {
    const response = await request.get<FetchCommunityPostResponse>(
      `${ENDPOINT}/${postId}`,
    );
    return response.data;
  },
  getPostList: async (params?: FetchCommunityPostsParams) => {
    const response = await request.get<FetchCommunityPostsResponse>(ENDPOINT, {
      params,
    });
    return response.data;
  },
  updatePostById: async (postId: number, body: UpdateCommunityDto) => {
    const response = await request.put<PostResponse>(
      `${ENDPOINT}/${postId}`,
      body,
    );
    return response.data;
  },
  deletePostById: async (postId: number) => {
    const response = await request.delete(`${ENDPOINT}/${postId}`);
    return response.data;
  },
  getBookmarkList: async () => {
    const response = await request.get<FetchBookmarkCommunitiesResponse>(
      `${ENDPOINT}/bookmark`,
    );
    return response.data;
  },
};
