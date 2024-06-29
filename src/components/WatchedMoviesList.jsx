import { MoviesDetailsCard } from "./MoviesDetailsCard";
import PropTypes from "prop-types";

export function WatchedMoviesList({ watched, onDeleteWatched, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <MoviesDetailsCard
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

WatchedMoviesList.propTypes = {
  watched: PropTypes.array.isRequired,
  onDeleteWatched: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};
