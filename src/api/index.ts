import axios from 'axios';

// 在vite配置了代理，这里直接用/api，会自动重写为后端地址
const BASE_URL = '/api';

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 暂时不用
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 如果后端固定返回 { code, data, message }，可以在这里直接返回 data
    console.log('API Response:', res.data);
    return res.data;
  },
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default service;