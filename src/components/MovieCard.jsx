import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../services/tmdbApi";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      {movie.poster_path ? (
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date || "No release date"}</p>
        <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
      </div>
    </Link>
  );
}

export default MovieCard;