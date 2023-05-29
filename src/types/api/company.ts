import {CompanyEntity, MemberReputationEntity, RecruitEntity} from './entities';

export interface FetchCompanyResponse {
  companyInfo?: CompanyEntity;
  recruits?: RecruitEntity[];
  reputations?: MemberReputationEntity[];
}
