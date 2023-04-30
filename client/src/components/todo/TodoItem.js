import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = ({ id, title, color, finishDate, onEdit, onDelete }) => {
  const [completed, setCompleted] = useState(finishDate ? true : false);
  const [completionDate, setCompletionDate] = useState(null);

  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {completed && completionDate && (
          <Card.Text>Finished: {completionDate.toString()}</Card.Text>
        )}
        <Button variant="secondary" onClick={() => onEdit(id)}>
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </Card.Body>
      {completed && completionDate && (
        <Card.Footer className="text-muted">
          Finished: {completionDate.toString()}
        </Card.Footer>
      )}
    </Card>
  );
};

export default TodoItem;
