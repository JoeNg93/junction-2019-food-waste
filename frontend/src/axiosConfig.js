import axios from 'axios';

export const initiateAxiosConfig = () => {
  axios.defaults.baseURL = 'http://localhost:5001';
}