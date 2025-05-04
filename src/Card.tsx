import React, { useState } from 'react';
import './App.css';
import { TodoItem } from "./types/todo";
interface CardProps {
  title: string;
  index: number;
  buttonDelete: (index: number) => void;
  buttonDone: (todo: TodoItem) => void;
  showButton: boolean;
}

const Card: React.FC<CardProps> = ({ title, index, buttonDelete, buttonDone, showButton }) => {
  const [state, setState] = useState({
    status: false,
    button: "Edit",
    todo: title
  });

  const edit = () => {
    if (state.status) {
      setState({
        ...state,
        status: false,
        button: "Edit"
      });
    } else {
      setState({
        ...state,
        status: true,
        button: "Save"
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  let element;
  if (state.status) {
    element = (
      <input
        type="text"
        name="todo"
        className="form-control"
        value={state.todo}
        onChange={handleInputChange}
      />
    );
  } else {
    element = (
      <input
        type="text"
        className="form-control"
        value={state.todo}
        disabled
      />
    );
  }

  let setDoneButton, editButton, removeButton;
  if (showButton) {
    setDoneButton = <button className="btn btn-outline-success" onClick={() => buttonDone({ word: title })}>
      Set as done
    </button>
    editButton =    <button
    className="btn btn-outline-info"
    onClick={edit}
  >
    {state.button}
  </button>
    removeButton = <button
    className="btn btn-outline-danger"
    onClick={() => buttonDelete(index)}
  >
    Remove
  </button>
  }
  
  return (
    <div className="card" id="card">
      <div className="card-body">
        <div className="lead mb-3">To-do {index + 1}</div>
        <div className="input-group mb-3">
          {element}
          <div className="input-group-append col-xs-4">
            {setDoneButton}
            {editButton}
            {removeButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;