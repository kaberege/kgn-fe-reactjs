import React from "react";

export default function Check({ id,isHeld,isChecked }) {
   // console.log(id)
    return (
        <input
            style={{ width: "20px", height: "auto", padding: "30px" }}
            type="checkbox"
            checked={isHeld}
            onChange={() => isChecked(id)}
        />
    );
}