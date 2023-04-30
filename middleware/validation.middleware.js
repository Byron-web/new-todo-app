exports.invalidUsername = (req, res, next) => {
  if (!endsWith(res.locals.username, "@gmail.com")) {
    return res
      .status(403)
      .send({ err: "Username can only end with @gmail.com" });
  }
  next();
};

exports.maxTaskLength = (req, res, next) => {
  if (exceedsMaxLength(req.body.task, 140)) {
    return res.status(403).send({ err: "Task exceeds 140 characters" });
  }
  next();
};

exports.jsonContentType = (req, res, next) => {
  if (!req.is("application/json")) {
    return res
      .status(403)
      .send({ err: "Http request can only have a content type of json" });
  }
  next();
};

//Helpers
const endsWith = (value, endString) => {
  var extracted = value.substring(value.length - endString.length);
  return endString === extracted;
};

const exceedsMaxLength = (value, maxLength) => {
  return value.length > maxLength;
};
