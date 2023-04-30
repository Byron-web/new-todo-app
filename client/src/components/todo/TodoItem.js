import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = ({ id, title, color, finishDate, onEdit, onDelete }) => {
  const [completed, setCompleted] = useState(finishDate ? true : false);
  const [completionDate, setCompletionDate] = useState(null);

  const handleDelete = async () => {
    try {
      const token = document.cookie.split("=")[1];
      const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!res.ok) {
        console.log(await res.json());
        return;
      }
      onDelete(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
        <Button variant="danger" onClick={handleDelete}>
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
