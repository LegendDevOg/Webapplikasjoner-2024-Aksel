import React, { useState, useEffect } from 'react';
import Search from './Search';
import Movies from './Movies';

const API_KEY = "b47fecbe";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const Main = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies('star wars');
  }, []);

  const fetchMovies = async (query) => {
    try {
        
      const response = await fetch(`${BASE_URL}&s=${query}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchMovies(search);
    }
  };

  return (
    <div>
      <Search search={search} setSearch={setSearch} onSubmit={handleSearchSubmit} />
      <Movies movies={movies} />
    </div>
  );
};

export default Main;