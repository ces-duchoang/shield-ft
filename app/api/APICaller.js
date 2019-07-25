import axios from 'axios';

const baseUrl = API_BASE_DOMAIN;

axios.defaults.withCredentials = true;
export default function Caller(endpoint, method = 'GET', body = {}) {
  return axios(
    `${baseUrl}/${endpoint}`,
    {
      method: method,
      data: body,
      withCredentials: true
    });
};