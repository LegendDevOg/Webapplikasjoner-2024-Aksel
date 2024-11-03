import React from 'react';

const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default Movie;