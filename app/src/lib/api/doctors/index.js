import axios from 'axios';

const doctorsApi = axios.create({
  baseURL: import.meta.env.VITE_API_DOCTORS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default doctorsApi;
