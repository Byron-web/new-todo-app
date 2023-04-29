const express = require("express");
const router = express.Router();
const usersController = require("../controller/user.controller");
const middleWareAuth = require("../middleware/authentication.middleware");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/auth", middleWareAuth.authenticate, usersController.auth);
router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
