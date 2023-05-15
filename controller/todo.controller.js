const db = require("../db");

//Todo CRUD

// This is an asynchronous function that retrieves all the todos from the database and sends them as a response.
exports.getAllTodos = async (req, res) => {
  try {
    // It calls the 'getAllTodos_async' function from the 'db' object to retrieve all the todos.
    var todos = await db.getAllTodos_async();
    // If no todos are found, it sends a 204 status code indicating that the request was successful but there is no data to return.
    if (!todos || todos.length <= 0) {
      return res.status(204).send();
    }
    // If todos are found, it sends the todos as a response.
    return res.send(todos);
  } catch (err) {
    // If an error occurs, it logs the error and sends a 500 status code with an error message.
    console.log(err);
    return res.status(500).send({ err: "Failed to find all todos" });
  }
};

//Creates a new todo in the database and returns the id of the created todo.
exports.createTodo = async (req, res) => {
  try {
    //Stores ID of the new todo object
    var id = await db.createTodo_async(req.body);
    //retireves id
    return res.send(id);
    //If there is an error, send error with status code 500 and a custom message
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "Failed to create todo" });
  }
};

// This is a function for updating a todo by its ID
exports.updateTodo = async (req, res) => {
  try {
    // Update the todo using the updateTodo_async function from the database
    var todo = await db.updateTodo_async(req.params.id, req.body);
    // Send the updated todo's ID in the response
    return res.send(todo.id);
    // If an error occurs, log it and return an error response
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ err: `Failed to update todo by id: [${req.params.id}]` });
  }
};

//Asynchronously deletes a todo with the specified id from the database
exports.deleteTodoById = async (req, res) => {
  try {
    // Delete a todo item from the database by the given id
    await db.deleteTodoById_async(req.params.id);
    // If the operation is successful, send a 204 status code (No Content)
    return res.status(204).send();
    // If an error occurs, log it to the console
  } catch (err) {
    console.log(err);
    // Return a 500 status code (Internal Server Error) with an error message
    return res
      .status(500)
      .send({ err: `Failed to delete todo by id: [${req.params.id}]` });
  }
};
