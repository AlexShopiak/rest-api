const fs = require('fs');

const getMovies = function(done){
  fs.readFile('movies.json', (err, fileContent) => {
    if(err) {
      return done(err)
    }

    const movieData = JSON.parse(fileContent).movies;
    return done(null, movieData);
  })       
}

const getMovieById = function(id,done){
  fs.readFile('movies.json', (err, fileContent) => {
    if(err) {
      return done(err)
    }

    const movieData = JSON.parse(fileContent).movies;
    console.log(movieData)
    const fetchedMovies = movieData.find(p => p.id == id);
    if(!fetchedMovies){
      return done('No product found')
    };
    return done(null, fetchedMovies);
  })       
}

const saveMovieDetails = function (MovieDetails, done) {
  fs.readFile('movies.json', (err, fileContent) => {
    if(err) {
      return done(err)
    }

    const movieData = JSON.parse(fileContent).movies;
    movieData.push(MovieDetails);
    fs.writeFile('movies.json', JSON.stringify({movies:movieData}), (err, updatedContent)=>{
      if(err) {
        return done(err)
      }
      return done(null, MovieDetails);
    });
  }) 
}

  const deleteMovieById = function(movieId, done){
    fs.readFile('movies.json', (err, fileContent) => {
      if(err) {
        return done(err)
      }
  
      const movieData = JSON.parse(fileContent).movies;
      const index = movieData.findIndex(p => p.id == movieId);
      if(index === 0){
        return done('No product found');
      }
      const movieDetails = { ...movieData.find(p => p.id == movieId) };
      movieData.splice(index, 1);
      
      fs.writeFile('movies.json', JSON.stringify({movies:movieData}), (err, updatedContent)=>{
        if(err) {
          return done(err)
        }
        return done(null, movieDetails);
      });
    })
  }


module.exports ={
  getMovies,
  getMovieById,
  saveMovieDetails,
  deleteMovieById
}