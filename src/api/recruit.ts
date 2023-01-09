import request from './request';

export function createRecruit(data: object) {
  return request.post('/recruit', data);
}
