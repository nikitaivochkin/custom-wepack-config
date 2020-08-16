import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  console.log('Request was sent');
  return config;
}, (error) => Promise.reject(error));

instance.interceptors.response.use((response) => {
  console.log('Response was resived');
  return response;
}, (error) => Promise.reject(error));

export const getRequest = async (params = {}) => {
  const query = `?${Object.keys(params)
    .map((param) => `_${param}=${params[param]}`)
    .join('&')}`;

  const { data } = await instance.request(query);
  return data;
};

export const postRequest = async (json) => {
  const { data } = await instance.post('', json);
  return data;
};
