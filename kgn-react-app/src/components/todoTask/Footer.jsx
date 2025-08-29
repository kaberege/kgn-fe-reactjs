import React from "react";

const Footer = ({ todos }) => {
  return (
    <>
      {todos.length === 0 ? (
        <p style={{ marginTop: "40px" }}>You can start to add a new item.</p>
      ) : (
        <p style={{ marginTop: "40px" }}>
          You have {todos.length} item{todos.length > 1 && "s"} in your list
        </p>
      )}
    </>
  );
};

export default Footer;
