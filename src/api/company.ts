import request from '@api/request';

export function fetchCompany(seq: number) {
  return request.get(`/company/${seq}`);
}
