import request from './request';

// TODO: 임시 엔드포인트 수정
const ENDPOINT = '/notice';

export const noticeApi = {
  getNoticeById: async (noticeId: number) => {
    // TODO: response 타입 정의
    const response = await request.get(`${ENDPOINT}/${noticeId}`);
    return response.data;
  },
  // TODO: response 타입 정의
  getNoticeList: async () => {
    const response = await request.get(ENDPOINT);
    return response.data;
  },
};
