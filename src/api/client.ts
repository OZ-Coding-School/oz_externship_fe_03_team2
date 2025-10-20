import axios, { type AxiosInstance } from 'axios'
import { setupInterceptors } from './interceptors'

const url = import.meta.env.VITE_API_BASE_URL

// 인스턴스
export const apiClient: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true, // httpOnly
  timeout: 10000, //10초
})

setupInterceptors(apiClient)

// api 호출
export const api = {
  get: <T>(url: string) => apiClient.get<T>(url).then((res) => res.data),

  post: <T, D = unknown>(url: string, data?: D) =>
    apiClient.post<T>(url, data).then((res) => res.data),

  put: <T, D = unknown>(url: string, data: D) =>
    apiClient.put<T>(url, data).then((res) => res.data),

  patch: <T, D = unknown>(url: string, data?: D) =>
    apiClient.patch<T>(url, data).then((res) => res.data),

  delete: <T = void>(url: string) =>
    apiClient.delete<T>(url).then((res) => res.data),
}
