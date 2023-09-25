import request from '@/api/request';
import {
  CreateReviewBody,
  GetReviewListResponse,
  GetReviewResponse,
  UpdateReviewBody,
} from '@/types/api/review.type';

const ENDPOINT = '/member/reputation';

export const reviewApi = {
  getReview: async (reviewId: number) => {
    const response = await request.get<GetReviewResponse>(`${ENDPOINT}/${reviewId}`);
    return response.data;
  },
  getReviewList: async () => {
    const response = await request.get<GetReviewListResponse>(`${ENDPOINT}`);
    return response.data;
  },
  createReview: async (body: CreateReviewBody) => {
    const response = await request.post(`${ENDPOINT}`, body);
    return response.data;
  },
  updateReview: async (reviewId: number, body: UpdateReviewBody) => {
    const response = await request.patch(`${ENDPOINT}/${reviewId}`, body);
    return response.data;
  },
  deleteReview: async (reviewId: number) => {
    const response = await request.delete(`${ENDPOINT}/${reviewId}`);
    return response.data;
  },
};
