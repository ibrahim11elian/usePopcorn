import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { MovieCard } from "./MovieCard";
import PropTypes from "prop-types";

export function MoviesSearchList({ movies, error, loading, onSelectMovie }) {
  if (error) return <ErrorMessage message={error} />;

  if (loading) return <Loader />;

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

MoviesSearchList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSelectMovie: PropTypes.func,
};
