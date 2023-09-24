import { ReviewEntity } from './entities.type';

export type GetReviewResponse = ReviewEntity;

export type GetReviewListResponse = ReviewEntity[];

export type CreateReviewBody = {
  recruitSeq: number;
  comment: string;
  evaluationMemberSeq: number;
  targetMemberSeq: number;
};

export type UpdateReviewBody = Partial<CreateReviewBody>;
