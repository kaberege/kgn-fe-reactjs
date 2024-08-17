import React from "react";
import "./todo.css";
import Input from "./Input";
import List from "./List";
import Footer from "./Footer";


export default function ToDo() {
    const [todo, setToDo] = React.useState(JSON.parse(localStorage.getItem("todoItems")) || []);
    console.log("...")

    React.useEffect(() => {
        localStorage.setItem("todoItems", JSON.stringify(todo));
    }, [todo])

    function newToDo(item) {
        setToDo(prevToDo => {
            return [...prevToDo, item]
        })
    }

    function removeItem(index) {
        setToDo(prevToDo => {
            let prev = [...prevToDo]
            prev.splice(index, 1);
            return prev;
        })
    }

    function isChecked(value) {
        setToDo(prevToDo => {
            let myprev = [...prevToDo]
            return myprev.map(item => {
                //item.id === value ? {...item, isHeld: !item.isHeld } : item
                if (item.id === value) {
                    return { ...item, isHeld: !item.isHeld };
                } else {
                    return item;
                }
            });
        })
    }

    return (
        <div className="toto-cotnainer">
            <h1>ToDo List</h1>
            <Input todos={newToDo} />
            <List
                todos={todo}
                removed={removeItem}
                isChecked={isChecked}
            />
            <Footer todos={todo} />
        </div>
    );
}