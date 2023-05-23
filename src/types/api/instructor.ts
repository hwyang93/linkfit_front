import {MemberLinkEntity, MemberReputationEntity} from './entities';

export interface FetchInstructorResponse {
  seq: number;
  name: string;
  nickname: string;
  address: string;
  intro: string;
  career: string;
  links: MemberLinkEntity[];
  follower: string;
  reputations: MemberReputationEntity[];
}
