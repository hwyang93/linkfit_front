import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 600000,
});

export default service;
