import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todo")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        <TodoItem />
      </ul>
    </div>
  );
};

export default TodoList;
