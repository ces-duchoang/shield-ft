import axios from 'axios';
import { getToken } from './Session';

// eslint-disable-next-line no-undef
const baseUrl = API_BASE_DOMAIN;

export default function Caller(
  endpoint,
  method = 'GET',
  { params = {}, ...body } = {}
) {
  return axios(`${baseUrl}/api/${endpoint}`, {
    method: method,
    data: body,
    params: params,
    withCredentials: true,
    headers: {
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
    }
  });
}
