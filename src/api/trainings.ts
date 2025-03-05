import axios from './axios';
import { TrainingData } from '../types/training';
import { ApiError } from '../types/apiTypes';

export default {
  async _getTrainings<T>(url: string, axiosConfig = {}): Promise<T> {
    try {
      const response = await axios.get(url, axiosConfig);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.message || 'Ошибка получения данных';
      throw new Error(errorMessage);
    }
  },

  async getTraining(id: number, axiosConfig = {}): Promise<TrainingData> {
    return this._getTrainings<TrainingData>(`/trainings/${id}`, axiosConfig);
  },

  async getAllTrainings(axiosConfig = {}): Promise<TrainingData[]> {
    return this._getTrainings<TrainingData[]>(
      '/trainings?sortBy=-id',
      axiosConfig,
    );
  },

  async deleteTraining(id: number): Promise<void> {
    try {
      const response = await axios.delete(`/trainings/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError.message;
    }
  },

  async createTraining(data: Omit<TrainingData, 'id'>): Promise<TrainingData> {
    try {
      const response = await axios.post('/trainings', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError.message;
    }
  },

  async updateTraining(
    id: number,
    data: Partial<TrainingData>,
  ): Promise<TrainingData> {
    try {
      const response = await axios.patch(`/trainings/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError.message;
    }
  },
};
