const express = require("express");
const router = express.Router();
const todosController = require("../controller/todo.controller");
const authenticationMiddleware = require("../middleware/authentication.middleware");

router.get(
  "/",
  authenticationMiddleware.authenticate,
  todosController.getAllTodos
);
router.post(
  "/",
  authenticationMiddleware.authenticate,
  todosController.createTodo
);
router.put(
  "/:id",
  authenticationMiddleware.authenticate,
  todosController.updateTodo
);
router.delete(
  "/:id",
  authenticationMiddleware.authenticate,
  todosController.deleteTodoById
);

module.exports = router;
