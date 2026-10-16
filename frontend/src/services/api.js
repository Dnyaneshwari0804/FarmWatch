import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getHistory = () => axios.get(`${API_URL}/history/`);
export const getStats = () => axios.get(`${API_URL}/stats/`);
export const predictStress = (formData) => axios.post(`${API_URL}/predict/`, formData);