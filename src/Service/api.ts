import axios from "axios";
import { IApiError } from "../Interface/ApiError";

const baseURL = process.env.REACT_APP_API_URL;
const baseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  'Authorization': ''
};

async function requestAxios<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  controller: 'students' | 'auth',
  params?: any,
  token?: string
): Promise<T> {
  try {
    const headers = { ...baseHeaders };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.request({
      method,
      url: `${baseURL}${controller}/${url}`,
      headers,
      data: params, 
    });
    return response.data;
  } catch (error: any) {
    const apiError: IApiError = {
      ...error,
      code: error.response?.status,
      details: error.response?.data,
    };
    throw apiError;
  }
}

export { requestAxios };