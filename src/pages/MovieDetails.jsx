import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedMovie,
  fetchMovieDetails,
} from "../features/movies/moviesSlice";
import { IMAGE_BASE_URL } from "../services/tmdbApi";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedMovie, detailsStatus, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieDetails(id));

    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [id, dispatch]);

  if (detailsStatus === "loading") {
    return <p className="message">Loading movie details...</p>;
  }

  if (detailsStatus === "failed") {
    return <p className="error">{error}</p>;
  }

  if (!selectedMovie) {
    return null;
  }

  return (
    <main className="container">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <section className="details">
        <div className="details-poster">
          {selectedMovie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
          ) : (
            <div className="no-image large">No Image</div>
          )}
        </div>

        <div className="details-content">
          <h1>{selectedMovie.title}</h1>

          {selectedMovie.tagline && (
            <p className="tagline">"{selectedMovie.tagline}"</p>
          )}

          <p>{selectedMovie.overview || "No overview available."}</p>

          <div className="details-list">
            <p>
              <strong>Release Date:</strong>{" "}
              {selectedMovie.release_date || "N/A"}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {selectedMovie.vote_average?.toFixed(1) || "N/A"}
            </p>

            <p>
              <strong>Runtime:</strong>{" "}
              {selectedMovie.runtime ? `${selectedMovie.runtime} min` : "N/A"}
            </p>

            <p>
              <strong>Genres:</strong>{" "}
              {selectedMovie.genres?.length
                ? selectedMovie.genres.map((genre) => genre.name).join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;