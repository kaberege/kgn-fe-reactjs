import React from "react";

export default function Delete({ index, removes }) {
  return (
    <button
      style={{ padding: "2px", fontSize: "12px" }}
      onClick={() => removes(index)}
    >
      Remove
    </button>
  );
}
