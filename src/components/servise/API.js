import axios from 'axios';

const API_KEY = 'a6d9ab8261d1a7a6ec1156be89c38fbd';
const BASE_URL = 'https://api.themoviedb.org/';

export async function fetchTrendingMovies() {
  const response = await axios.get(
    `${BASE_URL}3/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await response.data;
  return data;
}
