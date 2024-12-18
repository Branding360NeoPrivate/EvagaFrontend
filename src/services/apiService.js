import apiClient from "./apiClient";

const apiService = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data, headers) => apiClient.post(url, data, headers),
  put: (url, data) => apiClient.put(url, data),
  delete: (url) => apiClient.delete(url),
};

export default apiService;
