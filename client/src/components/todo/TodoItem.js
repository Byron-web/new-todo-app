import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

/* This code defines a React functional component called TodoItem that renders a Card component from the React Bootstrap library. The Card displays information about a todo item, including its title and color.*/

const TodoItem = ({ id, title, color, onDelete, onUpdate }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  // The handleDelete function is an asynchronous function that is called when the user clicks the "Delete" button for a Todo item.
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      //sends a DELETE request to the backend API to delete the corresponding Todo item with the specified id.
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
      //If the DELETE request is successful, it calls the onDelete callback function to remove the Todo item from the UI.
      onDelete(id);
      // Finally, it reloads the current page to update the UI with the remaining Todo items.
      window.location.reload();
      // If the DELETE request is not successful, it logs the error to the console.
    } catch (err) {
      console.log(err);
    }
  };

  // This function handles updating the title of a todo item.
  const handleUpdate = () => {
    onUpdate(id, editTitle);
    setIsEditing(false);
    window.location.reload();
  };

  //The component is enclosed in a Card component with the background color set to the color prop.
  return (
    <Card style={{ backgroundColor: color }}>
      <Card.Body>
        {/* If the isEditing state is true, an input element is rendered instead of
        the Card.Title element. The input element has the editTitle state as its
        value and an onChange handler that updates the editTitle state. onBlur
        and onKeyDown handlers are also present to handle updates when the input
        loses focus or when the user presses the Enter key. The autoFocus
        attribute is set to true to make the input element focused when it is
        rendered. */}
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleUpdate();
              }
            }}
            autoFocus
          />
        ) : (
          // If the isEditing state is false, the Card.Title element is rendered with an onClick handler that sets the isEditing state to true.
          <Card.Title onClick={() => setIsEditing(true)}>{title}</Card.Title>
        )}
        {/* The Edit button has an onClick handler that toggles the isEditing state. */}
        <Button
          variant="secondary"
          onClick={() => setIsEditing((prevState) => !prevState)}
        >
          Edit
        </Button>{" "}
        {/* The Delete button has an onClick handler that calls the handleDelete
        function, which sends a DELETE request to the server to delete the Todo
        item. */}
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
