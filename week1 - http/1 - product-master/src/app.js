const http = require('http')
const PORT = process.env.PORT || 5000;

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {//+
  if(req.url === '/products' && req.method === 'GET') {
    const products = productsService.getProducts();
    
    res.writeHead(200, {'Content-Type' : 'application/json'})
    res.end(products);
  }

  else if(req.url.match(/\/products\/([0-9]+)/) && req.method === 'GET') {//+
    const id = parseInt(req.url.split("/")[3]);

    productsService.getProductsById(id, (error, product) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(product);
      }
    })
  }

  else if(req.url === '/products' && req.method === 'POST') {//+
    const product_data = await getRequestData(req);

    productsService.saveProduct(JSON.parse(product_data), (error, product) => {//+
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(product);
      }     
    })
  }

  else if(req.url.match(/\/products\/([0-9]+)/) && req.method === 'PUT') {//+
    const id = parseInt(req.url.split("/")[3]);
    const product_data = await getRequestData(req);

    productsService.updateProduct(id, JSON.parse(product_data), (error, product) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(product);
      }     
    })
  } 

  else if(req.url.match(/\/products\/([0-9]+)/) && req.method === 'DELETE') {//+
    const id = parseInt(req.url.split("/")[3]);

    productsService.deleteProduct(id, (error, product) => {
      if(error){
        res.writeHead(404, {'Content-Type' : 'application/json'});
        res.end(error);
      } else {
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(product);
      }     
    });
  }

});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})
server.on('error', (error) =>{
  if(error.code === 'EADRINUSE') {
    console.log('Port already in use')
  }
})