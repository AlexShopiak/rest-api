const http = require("http");
const moviesService = require("./moviesService.js");
const getRequestData = require("./utils.js");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

  if(req.url === '/api/movies' && req.method === 'GET') {
    moviesService.getMovies((error, movies) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(movies);
      }    
    });
  }
  
  else if(req.url.match(/\/api\/movies\/([0-9]+)/) && req.method === 'GET') {
    const id = parseInt(req.url.split("/")[3]);

    moviesService.getMoviesById(id, (error, movie) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(movie);
      }
    })
  }

  else if(req.url === '/api/movies' && req.method === 'POST') {
    const movie_data = await getRequestData(req);

    moviesService.saveMovie(JSON.parse(movie_data), (error, movie) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(movie);
      }     
    })
  }

  else if(req.url.match(/\/api\/movies\/([0-9]+)/) && req.method === 'PUT') {//+
    const id = parseInt(req.url.split("/")[3]);
    const movie_data = await getRequestData(req);

    moviesService.updateMovie(id, JSON.parse(movie_data), (error, movie) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(movie);
      }     
    })
  } 

  else if(req.url.match(/\/api\/movies\/([0-9]+)/) && req.method === 'DELETE') {//+
    const id = parseInt(req.url.split("/")[3]);

    moviesService.deleteMovieById(id, (error, movie) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(movie);
      }     
    });
  }

  else {
    res.writeHead(404, {'Content-Type' : 'application/json'});
    res.end('No route present this capture');
  }
});


server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
