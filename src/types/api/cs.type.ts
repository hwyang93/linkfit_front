import { CsEntity } from '@/types/api/entities.type';

export interface FetchCsParams {
  type?: string;
}

export type FetchCsResponse = CsEntity[];
