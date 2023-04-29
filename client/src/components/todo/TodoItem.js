import React from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Button variant="primary">Edit</Button>{" "}
        <Button variant="danger">Delete</Button>{" "}
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
