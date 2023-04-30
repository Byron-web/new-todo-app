import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const TodoItem = ({ id, title, color, finishDate, onDelete, onEdit }) => {
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

  const handleEdit = () => {
    onEdit({ _id: id, task: title, color: color, finishDate: finishDate });
  };

  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {completed && completionDate && (
          <Card.Text>Finished: {completionDate.toString()}</Card.Text>
        )}
        <Button
          variant="secondary"
          onClick={() =>
            onEdit({
              _id: id,
              task: title,
              color: color,
              finishDate: finishDate,
            })
          }
        >
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

TodoItem.EditModal = ({ show, onHide, todo, onSave }) => {
  const [title, setTitle] = useState(todo.task);
  const [color, setColor] = useState(todo.color);
  const [finishDate, setFinishDate] = useState(new Date(todo.finishDate));

  const handleSave = () => {
    onSave(todo._id, title, color, finishDate);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{/* ... */}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TodoItem;
