/* This is a Node.js module that exports three middleware functions to validate HTTP requests. These middleware functions are:

invalidUsername: This middleware function checks if the username in the request is valid or not. It checks if the username ends with "@gmail.com" or not. If the username does not end with "@gmail.com", it returns a HTTP response with status code 403 and an error message saying that the username can only end with "@gmail.com".

maxTaskLength: This middleware function checks if the length of the task in the request exceeds the maximum length of 140 characters or not. If the length of the task exceeds 140 characters, it returns a HTTP response with status code 403 and an error message saying that the task exceeds 140 characters.

jsonContentType: This middleware function checks if the content type of the HTTP request is JSON or not. If the content type of the request is not JSON, it returns a HTTP response with status code 403 and an error message saying that the HTTP request can only have a content type of JSON.

In addition to these middleware functions, the module also exports two helper functions:

endsWith: This helper function takes two arguments - a string value and an end string. It extracts the last few characters from the string value that are equal to the length of the end string and compares it with the end string. If they are equal, it returns true; otherwise, it returns false.

exceedsMaxLength: This helper function takes two arguments - a string value and a maximum length. It checks if the length of the string value exceeds the maximum length or not. If it does, it returns true; otherwise, it returns false.*/

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
  return value && value.length > maxLength;
};
