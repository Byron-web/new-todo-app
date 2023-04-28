const config = require("../config/config.json");
const jwt = require("jsonwebtoken");

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
