import { CompanyEntity, MemberReputationEntity, RecruitEntity } from './entities.type';

export interface FetchCompanyResponse {
  companyInfo?: CompanyEntity;
  recruits?: RecruitEntity[];
  reputations?: MemberReputationEntity[];
}
