import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '3-w-assignment.vercel.app' : 'http://localhost:5000'
});

export default instance;
