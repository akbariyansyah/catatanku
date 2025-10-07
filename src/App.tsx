import React, { useState } from 'react';
import Card from './Card';
import swal from 'sweetalert';
import { TodoItem, AppProps } from './types/todo';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <DialogDemo />
      <div className="p-6 rounded-xl bg-background text-foreground border">
        Tailwind + shadcn tokens loaded ✅
      </div>

      {/* <Header /> */}


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

export function DialogDemo() {

  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default App;