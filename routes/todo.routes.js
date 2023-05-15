const express = require("express");
const router = express.Router();
const todosController = require("../controller/todo.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

//Main Route for GET AND POST using authentication and validation before sending response

/* This route is used to get all the todos. It uses authentication middleware to ensure only authenticated users can access it, and validation middleware to check if the username provided is valid.*/
router.get(
  "/",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  todosController.getAllTodos
);
/* This route is used to create a new todo. It uses authentication middleware to ensure only authenticated users can access it, validation middleware to check if the username provided is valid and if the request body has a valid JSON content type and if the task length is within the allowed limit.*/
router.post(
  "/",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  validationMiddleware.jsonContentType,
  validationMiddleware.maxTaskLength,
  todosController.createTodo
);
/* This route is used to update a todo with the specified id. It uses authentication middleware to ensure only authenticated users can access it, validation middleware to check if the username provided is valid and if the request body has a valid JSON content type and if the task length is within the allowed limit*/
router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  validationMiddleware.jsonContentType,
  validationMiddleware.maxTaskLength,
  todosController.updateTodo
);
/* This route is used to delete a todo with the specified id. It uses authentication middleware to ensure only authenticated users can access it, and validation middleware to check if the username provided is valid.*/
router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  validationMiddleware.invalidUsername,
  todosController.deleteTodoById
);

module.exports = router;
