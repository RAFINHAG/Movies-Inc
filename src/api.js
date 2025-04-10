import axios from 'axios';
import { API_READ_ACCESS_TOKEN } from './apiConfig';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await apiClient.get('/movie/popular?language=es');
    return response.data.results; // Regresa solo las películas populares
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    return [];
  }
};

export const getNowPlayingMovies = async () => {
    try {
      const response = await apiClient.get('/movie/now_playing?language=es&page=1'); // Solo primera página
      const movies = response.data.results;
  
      // Ordenar películas alfabéticamente por título
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      console.error('Error al obtener las películas en producción:', error);
      return [];
    }
  };
 