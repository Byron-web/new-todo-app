const config = require("../config/config.json");
const db = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

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

//User CRUD
exports.getAllUsers = async (req, res) => {
  try {
    var users = await db.getAllUsers_async();
    if (!users || users.length <= 0) {
      return res.status(204).send();
    }
    return res.send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    var id = await db.createUser_async(req.body);
    return res.send(id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    var user = await db.updateUser_async(req.params.id, req.body);
    return res.send(user.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update user by id: [${req.params.id}]` });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    await db.deleteUserById_async(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to delete user by id: [${req.params.id}]` });
  }
};
