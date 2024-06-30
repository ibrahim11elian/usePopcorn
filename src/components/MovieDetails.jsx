import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import TextExpander from "./TextExpander";
import { Loader } from "./Loader";
import PropTypes from "prop-types";

const API_KEY = import.meta.env.VITE_API_KEY;

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.some((m) => m.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (m) => m.imdbID === selectedId
  )?.userRating;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `${movie.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie.Title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieHeader movie={movie} onCloseMovie={onCloseMovie} />
          <MovieSection
            movie={movie}
            isWatched={isWatched}
            watchedUserRating={watchedUserRating}
            userRating={userRating}
            setUserRating={setUserRating}
            handleAdd={handleAdd}
          />
        </>
      )}
    </div>
  );
}

MovieDetails.propTypes = {
  selectedId: PropTypes.string.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onAddWatched: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
};

function MovieHeader({ movie, onCloseMovie }) {
  const {
    Poster: poster,
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Type: type,
  } = movie;

  return (
    <header>
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <img src={poster} alt={`Poster of ${title} movie`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>

        <p>{genre}</p>
        {type === "series" && <p>{movie.totalSeasons} Seasons</p>}
        <p>
          <span>⭐️</span>
          {imdbRating} IMDb rating
        </p>
      </div>
    </header>
  );
}
MovieHeader.propTypes = {
  movie: PropTypes.object.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
};

function MovieSection({
  movie,
  isWatched,
  watchedUserRating,
  userRating,
  setUserRating,
  handleAdd,
}) {
  const { Plot: plot, Actors: actors, Director: director } = movie;

  return (
    <section>
      <MovieRating
        isWatched={isWatched}
        watchedUserRating={watchedUserRating}
        userRating={userRating}
        setUserRating={setUserRating}
        handleAdd={handleAdd}
      />
      <div>
        <em>
          <TextExpander collapsedNumWords={10} buttonColor="#8c8cf8">
            {plot || ""}
          </TextExpander>
        </em>
      </div>
      <p>
        <strong>Starring:</strong> {actors}
      </p>
      <p>
        <strong>Directed by:</strong> {director}
      </p>
    </section>
  );
}
MovieSection.propTypes = {
  movie: PropTypes.object.isRequired,
  isWatched: PropTypes.bool.isRequired,
  watchedUserRating: PropTypes.number.isRequired,
  userRating: PropTypes.number.isRequired,
  setUserRating: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

function MovieRating({
  isWatched,
  watchedUserRating,
  userRating,
  setUserRating,
  handleAdd,
}) {
  return (
    <div className="rating">
      {!isWatched ? (
        <>
          <StarRating maxRating={10} size={25} onSetRate={setUserRating} />
          {userRating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              + Add to list
            </button>
          )}
        </>
      ) : (
        <p>
          You rated this movie {watchedUserRating} <span>⭐️</span>
        </p>
      )}
    </div>
  );
}

MovieRating.propTypes = {
  isWatched: PropTypes.bool.isRequired,
  watchedUserRating: PropTypes.number.isRequired,
  userRating: PropTypes.number.isRequired,
  setUserRating: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
