const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function request(endpoint) {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Add it in .env.local");
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  return response.json();
}

export function getPopularMovies() {
  return request("/movie/popular?page=1");
}

export function searchMoviesApi(query) {
  return request(`/search/movie?query=${encodeURIComponent(query)}&page=1`);
}

export function getMovieDetailsApi(movieId) {
  return request(`/movie/${movieId}`);
}