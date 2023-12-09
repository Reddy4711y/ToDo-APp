import { useState } from "react";
import "./Todo.css";

function ToDo() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    id: "",
  });

  const [editing, setEditing] = useState({
    id: "",
    isEditing: false,
  });

  // Handling Form Add Button
  const addHandler = (e) => {
    e.preventDefault();

    message.text !== "" && setList([...list, message]);

    setMessage({
      text: "",
      id: "",
    });
  };

  // Handling  form input text to attach message state
  const inputTextHandler = (e) => {
    let newTodo = {
      text: e.target.value,
      id: new Date().getTime().toString(),
    };
    setMessage(newTodo);
  };

  // Handling delete Functionality

  const deleteHandler = (id) => {
    let newTodos = list.filter((eachItem) => eachItem.id != id);
    setList(newTodos);
  };

  // Form Edit Handler
  const editHandler = (e) => {
    e.preventDefault();
    let newEditText = list.map((eachItem) => {
      if (eachItem.id === editing.id) {
        return {
          text: message.text,
          id: editing.id,
        };
      } else {
        return eachItem;
      }
    });
    setList(newEditText);
    setEditing({
      id: "",
      isEditing: false,
    });
    setMessage({
      text: "",
      id: "",
    });
  };

  // handle the Item edit handler

  const itemEditHandler = (comingid) => {
    setEditing({
      id: comingid,
      isEditing: true,
    });
    let item = list.find((ele) => ele.id === comingid);
    setMessage({
      text: item.text,
      id: item.id,
    });
  };

  return (
    <div className="container">
      <form>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Add Task To Your Todo"
          value={message.text}
          onChange={inputTextHandler}
        />
        {editing.isEditing ? (
          <button onClick={editHandler}>Edit</button>
        ) : (
          <button onClick={addHandler}>Add</button>
        )}
      </form>

      <hr />
      {list.length === 0 && (
        <h1 className="animate-charcter">Your Todo Is Empty</h1>
      )}
      <ul>
        {list.map((eachItem) => {
          const { text, id } = eachItem;
          return (
            <li key={id}>
              <span>{text}</span>
              <button className="but" onClick={() => itemEditHandler(id)}>
                edit
              </button>
              <button className="but" onClick={() => deleteHandler(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ToDo;
