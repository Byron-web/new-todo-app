const express = require("express");
const router = express.Router();
const usersController = require("../controller/user.controller");
const middlewareAuth = require("../middleware/authentication.middleware");

const authMiddleware = (req, res, next) => {
  middlewareAuth.authenticate(req, res, () => {
    usersController.auth(req, res, next);
  });
};

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/auth", authMiddleware, usersController.auth);
router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
