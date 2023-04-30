import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditTodo = ({ todo, onUpdate, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [color, setColor] = useState(todo.color);
  const [finishDate, setFinishDate] = useState(todo.finishDate);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = document.cookie.split("=")[1];
      const res = await fetch(`http://localhost:5000/api/todo/${todo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title,
          color,
          finishDate,
        }),
      });
      if (!res.ok) {
        console.log(await res.json());
        return;
      }
      const data = await res.json();
      onUpdate(data);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="finishDate">
            <Form.Label>Finish Date</Form.Label>
            <Form.Control
              type="date"
              value={finishDate}
              onChange={(event) => setFinishDate(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>{" "}
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTodo;
