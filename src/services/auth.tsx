import axios from 'axios';

const API_URL = 'http://localhost:8080'; 

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token } = response.data;
    localStorage.setItem('jwt', token);
    return true;
  } catch (error) {
    console.error('Failed to login:', error);
    return false;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem('jwt');
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token; 
};

export const logout = (): void => {
  localStorage.removeItem('jwt');
};
