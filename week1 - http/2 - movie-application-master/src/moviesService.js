const axios = require('axios');
const lodash = require('lodash');
const moviesList = require('../data/movies.json').movies;

const getMovies = (done) => {
  return done(null, JSON.stringify(moviesList));
}

const getMoviesById = (movieId, done) => {
  const movie = lodash.find(moviesList, { 'id': movieId });
  const error = movie ? null : 'Requested movie doesn\'t exist..!';
  
  return done(error, JSON.stringify(movie));
}

const saveMovie = function (newMovie, done) {
  const movieId = newMovie.id;
  let error = null;

  if (movieId) {
    const exist = lodash.find(moviesList, { 'id': movieId });
    if(exist) {
      error = "Movie already exists..!";
    } else {
      moviesList.push(newMovie);
    }
  } else {
    error = 'No id in params';
  }

  return done(error, JSON.stringify(moviesList));
}

const updateMovie = function (movieId, updateData, done) {
  let error = null;

  const exist = lodash.find(moviesList, { 'id': movieId });
  if(exist) {
    for (const movie of moviesList) {
      if (movie.id === movieId) {
        Object.assign(movie, updateData);
        break;
      }
    }
  } else {
    error = "Requested movie doesn't exist..!"
  }

  done(error, JSON.stringify(moviesList));
}

const deleteMovieById = function (movieId, done) {
  let error = null
  
  const index = moviesList.findIndex(obj => obj.id === movieId);
  if(index !== -1){
    moviesList.splice(index, 1);
  } else {
    error = "Requested movie doesn't exist..!";
  }
  
  done(error, JSON.stringify(moviesList));
}


module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
