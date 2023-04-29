const express = require("express");
const router = express.Router();
const usersController = require("../controller/user.controller");
const middleWareAuth = require("../middleware/authentication.middleware");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/auth", middleWareAuth.authenticate, usersController.auth);

module.exports = router;
