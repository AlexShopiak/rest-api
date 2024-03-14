const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  const product = lodash.find(productsList, { 'id': productId });
  const error = product ? null : 'Requested product doesn\'t exist..!';

  return done(error, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
  const productId = newProduct.id;
  let error = null;

  if (productId) {
    const exist = lodash.find(productsList, { 'id': productId });
    if(exist) {
      error = "Product already exists..!";
    } else {
      productsList.push(newProduct);
    }
  } else {
    error = 'No id in params';
  }

  return done(error, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let error = null;

  const exist = lodash.find(productsList, { 'id': productId });
  if(exist) {
    for (const product of productsList) {
      if (product.id === productId) {
        Object.assign(product, updateData);
        break;
      }
    }
  } else {
    error = "Requested product doesn't exist..!"
  }

  done(error, JSON.stringify(productsList));
}

const deleteProduct = (productId, done) => {
  let error = null
  
  const index = productsList.findIndex(obj => obj === productId);
  if(index !== -1){
    productsList.splice(index, 1);
  } else {
    error = "Requested product doesn't exist..!";
  }
  
  done(error, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}