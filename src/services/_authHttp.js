import axios from "axios";
import { jwtDecode } from "jwt-decode";

let refreshTokenRequest = null;

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenRequest) {
                refreshTokenRequest = refreshToken();
            }
            const newAccessToken = await refreshTokenRequest;
            refreshTokenRequest = null;

            if (newAccessToken) {
                localStorage.setItem('access-token', newAccessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);


const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh-token');
        const response = await axiosInstance.post('https://api.shipcluescargo.com/auth/refresh', { token: refreshToken });
        localStorage.removeItem('refresh-token');
        localStorage.setItem('refresh-token', response.data.refresh);
        return response.data.access;
    } catch (error) {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        window.location.href = '/login';
        return null;
    }
};

export default axiosInstance;
