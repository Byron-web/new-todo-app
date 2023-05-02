const express = require("express");
const router = express.Router();
const todosController = require("../controller/todo.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

//Main Route for GET AND POST using authentication and validation before sending response
router.get(
  "/",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  todosController.getAllTodos
);
router.post(
  "/",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  validationMiddleware.jsonContentType,
  validationMiddleware.maxTaskLength,
  todosController.createTodo
);
router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  validationMiddleware.jsonContentType,
  validationMiddleware.maxTaskLength,
  todosController.updateTodo
);
router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  todosController.deleteTodoById
);

module.exports = router;
