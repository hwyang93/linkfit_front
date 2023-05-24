import {YesNoFlag} from '../common';
import {MemberReputationEntity, RecruitEntity} from './entities';

export interface FetchCompanyResponse {
  companyInfo: {
    isFollow: YesNoFlag;
  };
  recruits?: RecruitEntity[];
  reputations?: MemberReputationEntity[];
}
