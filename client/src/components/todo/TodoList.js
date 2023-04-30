import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrrorMessage] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("#FFFFFF");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = document.cookie.split("=")[1];
        const res = await fetch("http://localhost:5000/api/todo", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        if (!res.ok) {
          setErrrorMessage((await res.json()).err);
          return;
        }
        const data = await res.json();
        setTodos(data);
        setErrrorMessage("");
      } catch (err) {
        console.log(err);
        setErrorMessage(err.response.data.message);
      }
    };

    fetchTodos();
  }, []);

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTaskTitle("");
    setNewTaskColor("#FFFFFF");
    setNewTaskDate(new Date());
  };

  const handleNewTaskTitleChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleNewTaskColorChange = (event) => {
    setNewTaskColor(event.target.value);
  };

  const handleNewTaskDateChange = (event) => {
    setNewTaskDate(event.target.valueAsDate);
  };

  const handleCreateTask = async () => {
    try {
      const token = document.cookie.split("=")[1];
      const res = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          task: newTaskTitle,
          color: newTaskColor,
          finishDate: newTaskDate,
        }),
      });
      if (!res.ok) {
        setErrorMessage((await res.json()).err);
        return;
      }
      const data = await res.json();
      setTodos([...todos, data]);
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

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
    <Container>
      {errorMessage}
      <h1>Todo List</h1>
      <Button variant="primary" onClick={handleCreateClick}>
        Create
      </Button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            id={todo._id}
            title={todo.task}
            color={todo.color}
            finishDate={todo.finishDate}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={handleNewTaskTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                as="select"
                value={newTaskColor}
                onChange={handleNewTaskColorChange}
              >
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Red">Red</option>
                <option value="Green">Green</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTaskDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newTaskDate.toISOString().substring(0, 10)}
                onChange={handleNewTaskDateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TodoList;
