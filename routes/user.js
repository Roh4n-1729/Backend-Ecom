const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/user");


router.post("/login",userController.postLogin)

router.post(
  "/signUp",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email exist");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  userController.postSignup
);

module.exports = router;
