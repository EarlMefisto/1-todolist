import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistLearn } from "./layout/todolists/TodolistLearn";
import { TodolistRead } from "./layout/todolists/TodolistRead";

//CRUD
// - повторяемость, дублирование - 100%
// - создание понятной структуры - holy war

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  //TaskType[] и Array<TaskType>: могут использоваться обе формы, но лучше Array<TaskType>

  //UI
  const [filter, setNextFilter] = useState<FilterValuesType>("all");

  const changeTodolistFilter = (nextFilter: FilterValuesType) => {
    setNextFilter(nextFilter);
  };

  // "What to learn?"
  const todolistTitle1 = "What to learn?";

  const [tasks, setNextTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);

  let filtredTasks: Array<TaskType> = tasks;
  if (filter === "active") {
    filtredTasks = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks = tasks.filter((t) => t.isDone);
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextState: TaskType[] = [newTask, ...tasks];
    setNextTasks(nextState);
  };

  const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    const nextState: Array<TaskType> = tasks.map((t) =>
      t.id === taskId ? { ...t, isDone: newStatus } : t
    );
    setNextTasks(nextState);
  };

  const removeTask = (taskId: string) => {
    const nextState: Array<TaskType> = tasks.filter((t) => t.id !== taskId);
    setNextTasks(nextState);
  };

  // "What to read?"
  const todolistTitle2 = "What to read?";

  const [tasks2, setNextTasks2] = useState<Array<TaskType>>([
    { id: v1(), title: "Mushishi", isDone: true },
    { id: v1(), title: "Hellsing", isDone: true },
    { id: v1(), title: "Jujutsu Kaisen 0", isDone: true },
    { id: v1(), title: "Spice and wolf", isDone: false },
    { id: v1(), title: "Tongari Boushi no Atelier", isDone: false },
    { id: v1(), title: "Vinland Saga", isDone: false },
    { id: v1(), title: "Mahoutsukai no Yome", isDone: false },
    { id: v1(), title: "Spy x Family", isDone: false },
  ]);

  let filtredTasks2: Array<TaskType> = tasks2;
  if (filter === "active") {
    filtredTasks2 = tasks2.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks2 = tasks2.filter((t) => t.isDone);
  }

  const addtask2 = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextState: TaskType[] = [newTask, ...tasks2];
    setNextTasks2(nextState);
  };

  const removeTask2 = (taskId: string) => {
    const nextState: Array<TaskType> = tasks.filter((t) => t.id !== taskId);
    setNextTasks(nextState);
  };

  return (
    <div className="App">
      <TodolistLearn
        title={todolistTitle1}
        tasks={filtredTasks}
        filter={filter}
        date="02.12.2024"
        addTask={addTask}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTodolistFilter={changeTodolistFilter}
      />
      <TodolistRead
        title={todolistTitle2}
        tasks={filtredTasks2}
        filter={filter}
        date="21.12.2024"
        addTask={addtask2}
        removeTask={removeTask2}
        changeTaskStatus={changeTaskStatus}
        changeTodolistFilter={changeTodolistFilter}
      />
    </div>
  );
}

export default App;
