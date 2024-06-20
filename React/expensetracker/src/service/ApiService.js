import axios from 'axios';

const API_URL = 'http://localhost:8080';

const signup = (userData) => {
    return axios.post(`${API_URL}/auth/signup`, userData);
};

const login = (credentials) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

const getProtectedData = (token) => {
    return axios.get(`${API_URL}/home/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export { signup, login, getProtectedData };