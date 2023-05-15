const config = require("../config/config.json");
const db = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/* This is an async function exports.register which accepts req and res parameters. It expects the req object to have a body property that contains the username and password of a user that is being registered.

The function first extracts the username and password from the request body. It then checks if both username and password are provided in the request body. If either of them is missing, it returns an error response with status code 400 and an error message saying "Username and password is required".

After validating that the username and password are provided, the function queries the database to get all existing users. It then checks if the username provided in the request body already exists in the database. If it does, the function returns an error response with status code 400 and an error message saying "Username already exists".

If the username provided in the request body is valid and does not already exist in the database, the function creates a new user in the database with the provided username and password. It then generates a JSON Web Token (JWT) using the jwt module with the username of the newly created user, a secret key, and an expiration time of one hour. The JWT is then sent back to the client as a response with status code 200.*/
exports.register = async (req, res) => {
  const user = req.body;
  const username = user.username;
  const password = user.password;

  //Validate username and password
  if (!username || !password) {
    return res.status(400).send({ err: "Username and password is required" });
  }
  const users = await db.getAllUsers_async();
  const existingUser = users.find((x) => x.username === username);
  if (existingUser) {
    return res.status(400).send({ err: "Username already exists" });
  }

  //Create User
  try {
    db.createUser_async(user);
  } catch (err) {
    console.log(err);
    return;
  }

  //Generate and sign token
  const token = jwt.sign(
    { username: user.username },
    process.env.SECRET || config.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  return res.send({ token: token });
};

/* This code exports two functions to handle user authentication. Here's the documentation for each of them:

exports.login = async (req, res) => { ... }
This function handles user login.
It expects the user's username and password to be sent in the request body.
It validates that both fields are present in the request body.
It then retrieves all the users from the database and finds the user with matching username and password.
If such a user exists, a JSON web token is generated and signed using the user's username and a secret key.
The token is then sent back in the response along with a 200 OK status code.
If the user does not exist or the password is incorrect, a 401 Unauthorized status code is returned with an error message in the response body.
exports.auth = async (req, res) => { ... }
This function is a placeholder for a protected route that requires authentication.
It simply returns a 200 OK status code with an empty response body, indicating that the user is authenticated and authorized to access the protected resource.*/

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Validate username and password
  if (!username || !password) {
    return res.status(400).send({ err: "Username and password is required" });
  }
  const users = await db.getAllUsers_async();
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).send({ err: "Username or password not valid" });
  }

  //Generate and sign token
  const token = jwt.sign(
    { username: user.username },
    process.env.SECRET || config.secret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
  return res.send({ token: token });
};

exports.auth = async (req, res) => {
  return res.send();
};
