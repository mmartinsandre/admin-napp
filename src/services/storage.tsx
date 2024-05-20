import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:8080/produto'; 

axios.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const handleRequestError = (action: string, error: any) => {
  console.error(`Erro ao ${action} produto:`, error);
  throw error;
};

export const getAllProdutos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleRequestError('buscar produtos', error);
  }
};

export const getProduto = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError('buscar produto', error);
  }
};

export const createProduto = async (produto: any) => {
  try {
    const response = await axios.post(API_URL, produto);
    return response.data;
  } catch (error) {
    handleRequestError('criar produto', error);
  }
};

export const updateProduto = async (id: string, produto: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, produto);
    return response.data;
  } catch (error) {
    handleRequestError('atualizar produto', error);
  }
};

export const deleteProduto = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError('deletar produto', error);
  }
};