const config = require("../config/config.json");
const jwt = require("jsonwebtoken");

/* This function exports an authentication middleware to validate a JWT token included in the request headers. If the token is valid, the decoded username is stored in the response locals and the next middleware function is called. f the token is not present or invalid, a 401 Unauthorized status code is returned with an error message.*/
exports.authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ err: "Could not find token" });
  }
  const token = req.headers.authorization.replace(/bearer /i, "");
  try {
    const decoded = jwt.verify(token, process.env.SECRET || config.secret);
    res.locals.username = decoded.username;
    return next();
  } catch (err) {
    return res.status(401).send({ err: "Invalid token" });
  }
};
