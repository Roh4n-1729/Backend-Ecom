const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth-middleware");
const wishlistController = require("../controllers/wishlist");

router.get(
  "/addtoWishlist/:productId",
  isAuth,
  wishlistController.addTowishlist
);

router.get("/showwishlist", isAuth, wishlistController.showwishlist);

router.delete(
  "/deletefromwishlist/:productId",
  isAuth,
  wishlistController.deletefromwishlist
);

module.exports = router;
