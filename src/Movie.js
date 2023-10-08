import React from 'react';

const MovieCard = ({ movieName, imageUrl, cardContent }) => (
  <div className="card">
    <h2>{movieName}</h2>
    <img src={imageUrl} alt={movieName} className="card-image" />
    <p className="card-content">{cardContent}</p>
  </div>
);

export default MovieCard;
