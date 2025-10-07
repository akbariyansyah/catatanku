import React, { useState } from 'react';
import Card from './Card';
import Header from './Header';
import swal from 'sweetalert';
import { TodoItem, AppProps } from './types/todo';



const App: React.FC<AppProps> = () => {
  const [state, setState] = useState({
    title: "",
    showCard: false,
    inProgressTodos: [] as TodoItem[],
    doneTodos: [] as TodoItem[],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.name);
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const remove = (index: number) => {
    swal("Are you sure ?", {
      buttons: ["Cancel", "Delete"],
    }).then((willDelete) => {
      if (willDelete) {
        const updatedScreen = [...state.inProgressTodos];
        updatedScreen.splice(index, 1);
        
        setState({
          ...state,
          inProgressTodos: updatedScreen
        });

      }
    });
  };

  const clear = () => {
    swal("Are you sure ?", {
      buttons: ["Cancel", "Delete"],
    }).then((willDelete) => {
      if (willDelete) {
        setState({
          ...state,
          inProgressTodos: []
        });
      }
    });
  };

  const add = () => {
    if (state.title === "") {
      swal("Input cannot be empty !");
    } else {
      // Create a new array instead of mutating the existing one
      const updatedScreen = [
        ...state.inProgressTodos,
        { word: state.title }
      ];
      
      setState({
        ...state,
        showCard: true,
        inProgressTodos: updatedScreen,
        title: ""
      });
    }
  };

  const done = (todo: TodoItem) => {
    setState({
      ...state,
      doneTodos: [...state.doneTodos, { word: todo.word }],
      inProgressTodos: state.inProgressTodos.filter(item => item.word !== todo.word) // Remove from values
    });
  }

  let progressCards, doneCards;
  if (state.showCard) {
    progressCards = state.inProgressTodos.map((data, index) => 
      <Card 
        key={index} 
        title={data.word} 
        index={index} 
        buttonDelete={remove} 
        buttonDone={done}
        showButton={true}
      />
    );
  }

  if (state.doneTodos.length > 0) {
    doneCards = state.doneTodos.map((data, index) =>
      <Card 
        key={index} 
        title={data.word} 
        index={index} 
        buttonDelete={remove} 
        buttonDone={done}
        showButton={false}
      />
    );
  }

  return (
    <div className="container" id="container">
      <Header />
      <div className="card" id="card">
        <div className="card-body">
          <div className="input-group mb-3">
            <input 
              type="text" 
              className="inputForm" 
              name="title" 
              placeholder="input new to-do..." 
              autoComplete="off" 
              value={state.title} 
              onChange={handleInputChange} 
            />
            <div className="input-group-append col-xs-4">
              <button 
                className="btn btn-outline-primary btn-lg" 
                onClick={add}
              >
                Add Todo's
              </button>
              <button 
                className="btn btn-outline-warning btn-lg" 
                onClick={clear}
              >
                Clear Todo's
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="display-4">
            To-do list :
          </div>
        </div>
      </div>
      {progressCards}
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="display-4">
            Done list :  <b>{state.doneTodos.length}</b>
          </div>
        </div>
      </div>
      {doneCards}
    </div>
  );
};

export default App;