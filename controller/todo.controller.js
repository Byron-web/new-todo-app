const db = require("../db");

//Todo CRUD
exports.getAllTodos = async (req, res) => {
  try {
    var todos = await db.getAllTodos_async();
    if (!todos || todos.length <= 0) {
      return res.status(204).send();
    }
    return res.send(todos);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to find all todos" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    var id = await db.createTodo_async(req.body);
    return res.send(id);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create todo" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    var todo = await db.updateTodo_async(req.params.id, req.body);
    return res.send(todo.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update todo by id: [${req.params.id}]` });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    await db.deleteTodoById_async(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to delete todo by id: [${req.params.id}]` });
  }
};
