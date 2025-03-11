import axios from 'axios';

const API_BASE_URL = 'http://192.168.9.205/api';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept request to add token or any other configurations
apiClient.interceptors.request.use(
  (config) => {
    // You can add your authorization token here if needed
    const token = sessionStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// Intercept response to handle global errors
apiClient.interceptors.response.use(
  (response) => {
    sessionStorage.setItem('res',response);    
    return response;

  },
  (error) => {
    if (!error.response) {
      
      alert("Service Unavailable: The API server is currently down.");
    } else if (error.response.status >= 500) {
      alert("Server Error: Please try again later.");
    } else {
      alert(error.response.data?.message || "An error occurred.");
    }    
    return Promise.reject(error);
  }
);

// Define your API methods
const apiService = {
  get(endpoint, params) {
    return apiClient.get(endpoint, { params });
  },
  post(endpoint, data) {
    return apiClient.post(endpoint, data);

  },
  put(endpoint, data) {
    return apiClient.put(endpoint, data);
  },
  delete(endpoint) {
    return apiClient.delete(endpoint);
  },
  // Add more methods as needed
};

export default apiService;