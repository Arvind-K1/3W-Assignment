import axios from '../services/axiosConfig';

export const submitUser = async (formData) => {
  return await axios.post('http://localhost:5000/api/users/upload', formData);
};

export const fetchUsers = async () => {
  return await axios.get('http://localhost:5000/api/users');
};
