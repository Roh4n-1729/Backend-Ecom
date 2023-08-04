const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/wishlist");

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(express.json());

const MONGODB_URI = "URL needed";

app.use(productRoute);
app.use(userRoute);
app.use(orderRoute);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log("Connected");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
