// import React, { useState, useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
// import TodoItem from "./TodoItem";

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");

//   useEffect(() => {
//     fetch("/api/todo")
//       .then((response) => response.json())
//       .then((data) => setTodos(data));
//   }, []);

//   const handleCreate = (event) => {
//     event.preventDefault();
//     fetch("/api/todo", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title: newTodo, completed: false }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setTodos([...todos, data]);
//         setNewTodo("");
//       });
//   };

//   const handleInputChange = (event) => {
//     setNewTodo(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <ul>
//         {todos.map((todo) => (
//           <TodoItem key={todo._id} todo={todo} />
//         ))}
//       </ul>
//       <Form onSubmit={handleCreate}>
//         <Form.Group controlId="formBasicEmail">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter title"
//             value={newTodo}
//             onChange={handleInputChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Create
//         </Button>{" "}
//       </Form>
//     </div>
//   );
// };

// export default TodoList;
