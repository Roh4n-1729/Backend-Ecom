const Product = require("../models/product");
const User = require("../models/user");
const Wishlist = require("../models/wishlist");
const { find } = require("../models/wishlist");

exports.addTowishlist = (req, res, next) => {
  const prodId = req.params.productId;
  const wishlist = new Wishlist({
    product: prodId,
    userId: req.userId,
  });

  Wishlist.findOne({ userId: req.userId, product: prodId }).then((product) => {
    console.log(typeof(product))
    if(product){
      const err = new Error()
      err.message = "Duplicate entry";
      throw err
    }
  }).then(()=>{
    wishlist.save();
    res.status(200).send(wishlist);

  }).catch ((error) =>{ 
    res.status(401).json(error);
  })
};

exports.showwishlist = (req, res, next) => {
  Wishlist.find({ userId: req.userId })
    .populate("product", "title")
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletefromwishlist = (req, res, next) => {
  console.log("here");
  const prodId = req.params.productId;
  console.log(prodId);
  Wishlist.findOneAndRemove({ userId: req.userId, product: prodId })
    .then((product) => {
      if (!product) {
        const err = new Error("Cant find the product");
        err.statusCode = 400;
        throw err;
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
