const express = require('express')

const config = require("./config.js");
const app = express();
const productsRouter = require("./src/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productsRouter);


const server = app.listen(config.PORT, () => {
  console.log('Listening on port', config.PORT);
});

module.exports = server;
