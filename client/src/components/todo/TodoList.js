import React from "react";
import { Button } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, bread, eggs, cheese",
    },
  ];

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <Button className="mt-3" variant="primary">
        Create
      </Button>{" "}
    </div>
  );
};

export default TodoList;
