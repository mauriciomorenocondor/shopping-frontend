import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://44.201.129.107:8080/api/v1/',
    //baseURL: 'http://localhost:8080/api/v1/',
    timeout: 30000,
    headers: {
      'Content-type': 'application/json'
    },
});
  
export default axiosInstance;