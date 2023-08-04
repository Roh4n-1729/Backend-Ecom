const express = require("express");
const productController = require("../controllers/product");
const { body } = require("express-validator");
const isAuth = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/getAllProducts", isAuth, productController.getAllProducts);

router.get("/getProducts/me", isAuth, productController.getProducts);

router.post(
  "/addProduct",
  isAuth,
  body("title").trim().isLength({ min: 3 }), //validators
  body("description").trim().isLength({ min: 10, max: 100 }),
  productController.postAddProduct
);
router.post("/aboutProduct/:productId",productController.getProduct)

router.delete("/deleteProduct/:productId",isAuth, productController.deleteProduct);

module.exports = router;
