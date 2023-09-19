import {CsEntity} from '@/types/api/entities';

export interface FetchCsParams {
  type?: string;
}

export type FetchCsResponse = CsEntity[];
