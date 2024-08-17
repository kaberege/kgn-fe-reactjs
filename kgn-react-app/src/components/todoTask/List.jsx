import React from "react";
import Check from "./Check";
import Delete from "./Delete";

export default function List({ todos, removed, isChecked }) {
    //console.log(deleted)
    const lists = todos.map(data => {
        let decorate = data.isHeld ? "rgba(0,0,255,0.4)" : "rgba(0,0,255,1)"
        return <li key={data.id} style={{ marginTop: "5px"}}>
            <Check
                isChecked={isChecked}
                id={data.id}
                isHeld={data.isHeld}
            />
            <span style={{ display: "flex", alignItems: "center", color: decorate, width: "170px" }}>{data.item}</span>
            <Delete index={todos.indexOf(data)} removes={removed} />
        </li>
    }
    );
    return (
        <ul
            className="list-container"
            style={{ listStyleType: "none" }}
        >
            {lists}
        </ul>
    );
}