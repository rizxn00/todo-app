import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Pencil, Plus, Trash2, Terminal } from "lucide-react";
import axios from "axios";
import { Alert, AlertTitle } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

function Home() {

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [todo, setTodo] = useState("");
  const [todos, getTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const inpref = useRef(null)

  useEffect(() => {
    const darkMode = localStorage.getItem("dark-mode") === "true";
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleTheme = () => {
    const darkMode = !isDark;
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo);
    if (!todo) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    } else {
      axios
        .post(`${API_BASE_URL}/todo`, { todo: todo })
        .then((res) => {
          return
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setTodo('')
    inpref.current.focus()
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/gettodo`)
      .then((res) => {
          getTodos(res.data);
      })
      .catch((err) => err);
  });

  const handleEdit = (id) => {
    if (!todo) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    } else {
    axios
      .post(`${API_BASE_URL}/edittodo`, { id: id, todo: todo })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
    }
  };

  const handleDelete = (id) => {
    axios
      .post(`${API_BASE_URL}/deletetodo`, { id: id })
      .then((res) => {
      })
      .catch((err) => err);
  };

 

  return (
    <div className="flex items-center justify-center  mt-10 mb-5 px-4 sm:px-0 ">
      <div className="fixed top-5 right-5">
        <button onClick={toggleTheme} className="p-2">
          {isDark ? (
            <svg
              className="hidden dark:block"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-slate-400"
                d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
              />
              <path
                className="fill-slate-500"
                d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
              />
            </svg>
          ) : (
            <svg
              className="dark:hidden"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-slate-900"
                d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
              />
              <path
                className="fill-slate-900"
                d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
              />
            </svg>
          )}
        </button>
      </div>
      <Card className="w-6/6 sm:w-4/6 md:w-2/4 lg:w-3/6 xl:w-2/6 overflow-hidden shadow-xl shadow-blue-grey-500/30 dark:shadow-slate-800 dark:shadow-md dark:bg-zinc-900 mt-5 font-poppins">
        <CardHeader>
          <CardTitle className=" text-3xl text-center font-semibold  hover:tracking-widest transition-all">
            To-Do
          </CardTitle>

          <CardDescription className="text-center">add a todo</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="flex w-full max-w-sm items-center space-x-2 ">
              <Input
                ref={inpref}
                name="todoinput"
                placeholder="what's on your mind"
                className=" focus-visible:ring-transparent capitalize"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <Button>
                <Plus />
              </Button>
            </div>
          </form>
        </CardContent>
        
        {todos.map((todoItem, index) => {
          return (
            <div className="flex space-x-2 mr-3 ml-3 mb-5 justify-center" key={todoItem._id}>
              <Card className="flex items-center justify-center overflow-hidden shadow-lg shadow-blue-grey-500/20 max-h-11">
                <CardContent className=" w-80">
                  <p className="mt-5 capitalize">{todoItem.todo}</p>
                </CardContent>
              </Card>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className=" w-12 h-10 overflow-hidden shadow-lg shadow-blue-grey-500/20"
                    onClick={() => setSelectedTodo(todoItem)}
                  >
                    <Pencil />
                  </Button>
                </DialogTrigger>
                {selectedTodo && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Todo </DialogTitle>
                      <DialogDescription>
                        Make changes to your todo
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      id="MyInput"
                      key={selectedTodo._id}
                      defaultValue={selectedTodo.todo}
                      className="w-full"
                      required
                      onChange={(e) => setTodo(e.target.value)}
                    />
                    <DialogFooter>
                      <Button
                        type="submit"
                        id="updatesubmit"
                        onClick={() => handleEdit(selectedTodo._id)}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>

              <Button
                className="overflow-hidden shadow-lg shadow-blue-grey-500/20 w-12 h-10 "
                onClick={() => handleDelete(todoItem._id)}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </Card>
      <div className={open ? "" : "hidden"}>
        <div className=" fixed right-5 bottom-5">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle className="pr-10">Input Is Empty</AlertTitle>
          </Alert>
        </div>
      </div>
    </div>
  );
}


export default Home;
