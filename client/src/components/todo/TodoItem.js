import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

/* This code defines a React functional component called TodoItem that renders a Card component from the React Bootstrap library. The Card displays information about a todo item, including its title, completion status, and color. The component also includes a Modal component that allows the user to edit the todo item's title. */

const TodoItem = ({ id, title, color, finishDate, onDelete, onEditSave }) => {
  const [completed, setCompleted] = useState(finishDate ? true : false);
  const [completionDate, setCompletionDate] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

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
        <Button variant="secondary" onClick={() => setEditModalShow(true)}>
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
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onEditSave(editTitle);
            setEditModalShow(false);
          }}
        >
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditModalShow(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(event) => onEditSave(editTitle, event)}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card>
  );
};

export default TodoItem;
