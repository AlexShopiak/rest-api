const moviesService = require('./movieservice.js')


const getMovies = (done) => {
  moviesService.getMovies(done);
}

const getMovieById = (movieId, done) => {
    moviesService.getMovieById(movieId, done);
}

const saveMovieDetails = (movieDetails, done) => {
  moviesService.saveMovieDetails(movieDetails, done);
}

const updateMovieDetails = (movieId, movieDetails, done) => {
  moviesService.updateMovieDetails(movieId, movieDetails, done);
}

const deleteMovieById = (movieId, done) => {
  moviesService.deleteMovieById(movieId, done);  
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, updateMovieDetails, deleteMovieById
}
