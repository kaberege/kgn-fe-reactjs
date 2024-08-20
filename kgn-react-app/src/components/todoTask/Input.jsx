import React from "react";

export default function Input({ todos }) {
    // console.log(todos)
    const [name, setName] = React.useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function addItems() {
        if (name === "") {
            alert("Please! Add an item.");
        } else {
            const listItems = { item: name, id: Date.now(), isHeld: false };
            todos(listItems);
            setName("");
        }
    }

    return (
        <div className="todo-input-button">
            <input
                maxLength={13}
                type="text"
                placeholder="Type here..."
                value={name}
                onChange={handleChange}
            />
            <button onClick={addItems}>Add +</button>
        </div>
    );
}