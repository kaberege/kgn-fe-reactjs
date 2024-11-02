import React from "react";
import "./todo.css";

export default function Input({ todos }) {
    // console.log(todos)
    const [name, setName] = React.useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function addItems(e) {
        e.preventDefault();
        if (name === "") {
            alert("Please! Add an item.");
        } else {
            const listItems = { item: name, id: Date.now(), isHeld: false };
            todos(listItems);
            setName("");
        }
    }

    return (
        <form className="todos-input-button">
            <input
            maxLength={10}
                type="text"
                placeholder="Type here..."
                value={name}
                onChange={handleChange}
            />
            <button
                onClick={addItems}
            >Add +</button>
        </form>
    );
}