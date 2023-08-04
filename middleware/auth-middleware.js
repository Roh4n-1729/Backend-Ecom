const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  console.log("Here in auth")
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).send('Not autheticated')
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    throw err;
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("not auth");
    error.statusCode = 401;
    throw error;
  }
  console.log(decodedToken)
  req.userId = decodedToken.userId;
  next();
};
