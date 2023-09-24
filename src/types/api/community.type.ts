import { YesNoFlag } from '../common';
import { CommunityEntity } from './entities.type';

export interface FetchCommunityPostsParams {
  category?: string[];
  isWriter?: YesNoFlag;
}

export type FetchCommunityPostsResponse = CommunityEntity[];

export type FetchCommunityPostResponse = CommunityEntity;

export type FetchBookmarkCommunitiesResponse = {
  createdAt: string;
  updatedAt: string;
  seq: number;
  memberSeq: number;
  favoriteSeq: number;
  community: CommunityEntity;
}[];
