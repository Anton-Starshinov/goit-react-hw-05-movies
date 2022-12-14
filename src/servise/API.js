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

export async function fetchMoviesDetails(movie_id) {
  const response = await axios.get(
    `${BASE_URL}3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.data;
  return data;
}

export async function fetchMoviesCast(movie_id) {
  const response = await axios.get(
    `${BASE_URL}3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.data;
  return data;
}

export async function fetchMoviesReviews(movie_id) {
  const response = await axios.get(
    `${BASE_URL}3/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.data;
  return data;
}

export async function fethchMoviesQuery(query) {
  const response = await axios.get(
    `${BASE_URL}3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
  );
  const data = await response.data;
  return data;
}
