import { CompanyEntity, RecruitEntity, ReviewEntity } from './entities.type';

export interface FetchCompanyResponse {
  companyInfo?: CompanyEntity;
  recruits?: RecruitEntity[];
  reputations?: ReviewEntity[];
}
