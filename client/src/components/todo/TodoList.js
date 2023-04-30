import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = document.cookie.split("=")[1];
        const res = await fetch("http://localhost:5000/api/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Container>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} id={todo._id} title={todo.title} />
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
