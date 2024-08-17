import React from "react";

export default function Delete({index, removes}){
    return(
        <button  style={{padding: "5px" }} onClick={() => removes(index)}>Remove</button>
    );
}