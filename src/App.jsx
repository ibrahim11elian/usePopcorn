import { useState } from "react";
import useGetMovies from "./hooks/useGetMovies";
import { useLocalStorageState } from "./hooks/useLoacalStorage";
import { NavBar } from "./components/NavBar";
import { SearchInput } from "./components/SearchInput";
import { NumResults } from "./components/NumResults";
import { Box } from "./components/Box";
import { MoviesSearchList } from "./components/MoviesSearchList";
import { WatchedMoviesSummary } from "./components/WatchedMoviesSummary";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { MovieDetails } from "./components/MovieDetails";
import PropTypes from "prop-types";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");

  const { data: movies, loading, error } = useGetMovies(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <SearchInput query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MoviesSearchList
            movies={movies}
            loading={loading}
            error={error}
            onSelectMovie={handleSelectMovie}
          />
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onSelectMovie={handleSelectMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
