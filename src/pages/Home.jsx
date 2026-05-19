import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import {
  clearSearchResults,
  fetchPopularMovies,
  searchMovies,
} from "../features/movies/moviesSlice";
import { debounce } from "../utils/debounce";

function Home() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    popularMovies,
    searchResults,
    popularStatus,
    searchStatus,
    error,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const debouncedSearch = useMemo(() => {
    return debounce((query) => {
      dispatch(searchMovies(query));
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    const query = searchTerm.trim();

    if (!query) {
      debouncedSearch.cancel();
      dispatch(clearSearchResults());
      return;
    }

    debouncedSearch(query);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch, dispatch]);

  const isSearching = searchTerm.trim().length > 0;
  const movies = isSearching ? searchResults : popularMovies;
  const status = isSearching ? searchStatus : popularStatus;

  return (
    <main className="container">
      <section className="hero">
        <h1>Movie App Redux Toolkit</h1>
        <p>Discover popular movies and search with debounce.</p>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </section>

      {status === "loading" && <p className="message">Loading movies...</p>}

      {status === "failed" && <p className="error">{error}</p>}

      {status === "succeeded" && movies.length === 0 && (
        <p className="message">No movies found.</p>
      )}

      <section className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
}

export default Home;