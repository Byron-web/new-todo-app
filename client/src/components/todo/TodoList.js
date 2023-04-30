import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <Container>
      <h1>Todo List</h1>
      <ul>
        <TodoItem />
      </ul>
    </Container>
  );
};

export default TodoList;
