import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrrorMessage] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = document.cookie.split("=")[1];
        const res = await fetch("http://localhost:5000/api/todo", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        if (!res.ok) {
          setErrrorMessage((await res.json()).err);
          return;
        }
        const data = await res.json();
        setTodos(data);
        console.log(todos);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Container>
      <h1>Todo List</h1>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo._id} id={todo._id} title={todo.task} />
        ))}
      </div>
    </Container>
  );
};

export default TodoList;
