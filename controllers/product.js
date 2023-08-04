const Product = require("../models/product");
const { validationResult } = require("express-validator");


//all products
exports.getAllProducts = (req, res, next) => {
  console.log(req.userId)
  Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

// your products
exports.getProducts = (req, res, next) => {
  
  Product.find({userId: req.userId})
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

//products
exports.getAddProduct = (req, res, next) => {
  console.log("Add product");
  res.status(200).send();
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return res.status(422).send("validation error");
  }

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId : req.userId
  });
  try {
    product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

//get the individual product
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  Product.findById(prodId)
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).send("Not found ");
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findOneAndDelete({ _id: prodId,userId: req.userId })
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).send("Not found ");
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

