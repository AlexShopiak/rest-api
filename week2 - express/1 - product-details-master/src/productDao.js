
const fs = require('fs');

const getProducts = function(done){
  fs.readFile('products.json', (err, fileContent) => {
    if(err) {
      return done(err)
    }

    const productData = JSON.parse(fileContent);
    return done(null, productData);
  })       
}

const getProductById = function(id,done){
  fs.readFile('products.json', (err, fileContent) => {
    if(err) {
      return done(err)
    }

    const productData = JSON.parse(fileContent);
    const fetchedProducts = productData.find(p => p == id);
    if(!fetchedProducts){
      return done('No product found')
    };
    return done(null, fetchedProducts);
  })       
}

const saveProductDetails = function (ProductDetails, done) {
  fs.readFile('products.json', (err, fileContent) => {
    if(err) {
      return done(err)
    }

    const productData = JSON.parse(fileContent);
    productData.push(ProductDetails);
    fs.writeFile('products.json', JSON.stringify(productData), (err, updatedContent)=>{
      if(err) {
        return done(err)
      }
      return done(null, ProductDetails);
    });
  }) 
}

  const deleteProductById = function(productId, done){
    fs.readFile('products.json', (err, fileContent) => {
      if(err) {
        return done(err)
      }
  
      const productData = JSON.parse(fileContent);
      const index = productData.findIndex(p => p == productId);
      if(index === -1){
        return done('No product found');
      }
      const productDetails = { ...productData.find(p => p == productId) };
      productData.splice(index, 1);
      
      fs.writeFile('products.json', JSON.stringify(productData), (err, updatedContent)=>{
        if(err) {
          return done(err)
        }
        return done(null, productDetails);
      });
    })
  }


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById
}