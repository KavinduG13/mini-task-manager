import axiosInstance from '../axios';

export const tasksApi = {
  getTasks: async (params) => {
    const response = await axiosInstance.get('/tasks', { params });
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data) => {
    const response = await axiosInstance.post('/tasks', data);
    return response.data;
  },

  updateTask: async (id, data) => {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data;
  },

  markAsCompleted: async (id) => {
    const response = await axiosInstance.patch(`/tasks/${id}/complete`);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },
};
