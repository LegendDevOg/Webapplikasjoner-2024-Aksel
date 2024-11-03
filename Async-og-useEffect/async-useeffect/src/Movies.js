import React from 'react';
import Movie from './Movie';
import './Movies.css';

const Movies = ({ movies }) => {
  return (
    <div className="movies-grid">
      {movies.slice(0, 5).map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;