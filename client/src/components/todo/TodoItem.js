import React from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = ({ id, title }) => {
  return (
    <div key={id}>
      <Card>
        <Card.Body className="p-4">
          <Card.Title>{title}</Card.Title>
          <Button variant="primary">Edit</Button>{" "}
          <Button variant="danger">Delete</Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoItem;
