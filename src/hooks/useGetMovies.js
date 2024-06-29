import { useEffect, useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

const baseURL = "https://www.omdbapi.com/";

const useGetMovies = (search) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = useCallback(
    debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseURL}?apikey=${API_KEY}&s=${searchTerm}`
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();
        setData(json.Search || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (search) {
      getMovies(search);
    } else {
      setData([]);
    }
  }, [search, getMovies]);

  return { data, loading, error };
};

function debounce(func, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default useGetMovies;
