import axios from 'axios';

const patientsApi = axios.create({
  baseURL: import.meta.env.VITE_API_PATIENTS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default patientsApi;
