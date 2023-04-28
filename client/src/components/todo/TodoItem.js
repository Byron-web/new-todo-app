import React from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = ({ todo }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>description</Card.Text>
        <Button variant="primary">Edit</Button>{" "}
        <Button variant="danger">Delete</Button>{" "}
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
