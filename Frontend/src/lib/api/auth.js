import axiosInstance from '../axios';

export const authApi = {
  login: async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },

  register: async (data) => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },
};
