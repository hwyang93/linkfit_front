import axios from 'axios';

const service = axios.create({
  // 배포전이므로 현재 서버 구동 아이피 주소로 변경
  baseURL: 'http://172.30.1.68:3000/api/v1',
  timeout: 600000,
});
service.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default service;
