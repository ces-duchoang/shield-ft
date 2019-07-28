import axios from "axios";
import { getToken } from "./Session";

const baseUrl = API_BASE_DOMAIN;

export default function Caller(endpoint, method = "GET", body = {}) {
  return axios(`${baseUrl}/api/${endpoint}`, {
    method: method,
    data: body,
    withCredentials: true,
    headers: {
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
    }
  });
}
