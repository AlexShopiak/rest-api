const axios = require('axios');
const movieDao = require('./movieDao.js')

//This method will get all movies from json server
const getMovies = (done) => {
 movieDao.getMovies(done);
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  movieDao.getMovieById(movieId, done);
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  movieDao.saveMovieDetails(movieDetails, done);
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  movieDao.updateMovieDetails(movieId, movieDetails, done);
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  movieDao.deleteMovieById(movieId, done);
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
