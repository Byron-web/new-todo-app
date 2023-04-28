const Todo = require("./models/todo.model");
const User = require("./models/user.model");

//User CRUD
exports.getAllUsers_async = async () => {
  return await User.find();
};

exports.createUser_async = async (user) => {
  return await new User(user).save();
};

exports.updateUser_async = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

exports.deleteUserById_async = async (id) => {
  await User.findByIdAndDelete(id);
};

//Todo CRUD
exports.getAllTodos_async = async () => {
  return await Todo.find();
};

exports.createTodo_async = async (todo) => {
  return await new Todo(todo).save();
};

exports.updateTodo_async = async (id, todo) => {
  return await Todo.findByIdAndUpdate(id, todo);
};

exports.deleteTodoById_async = async (id) => {
  return await Todo.findByIdAndDelete(id);
};
