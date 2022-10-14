import axios from 'axios';

let baseUrl = 'http://178.63.13.157:8090/mock-api/api';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
})