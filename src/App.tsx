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
  const todolistTitle1 = "What to learn?";
  const [tasks, setNextTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);

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

  //TaskType[] и Array<TaskType>: могут использоваться обе формы, но лучше Array<TaskType>

  const removeTask = (taskId: string) => {
    // const nextState: Array<TaskType> = tasks.filter((t) => t.id !== taskId);
    setNextTasks((previousState) =>
      previousState.filter((t) => t.id !== taskId)
    );
    // console.log(tasks);
  };

  const removeTask2 = (taskId: string) => {
    setNextTasks2((previousState) =>
      previousState.filter((t) => t.id !== taskId)
    );
  };

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextState: TaskType[] = [newTask, ...tasks];
    setNextTasks(nextState);
  };

  const addtask2 = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const nextState: TaskType[] = [newTask, ...tasks2];
    setNextTasks2(nextState);
  }

  //UI
  const [filter, setNextFilter] = useState<FilterValuesType>("all");

  const changeTodolistFilter = (nextFilter: FilterValuesType) => {
    setNextFilter(nextFilter);
  };

  // "What to learn?"
  let filtredTasks: Array<TaskType> = tasks;
  if (filter === "active") {
    filtredTasks = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks = tasks.filter((t) => t.isDone);
  }

  // "What to read?"
  let filtredTasks2: Array<TaskType> = tasks2;
  if (filter === "active") {
    filtredTasks2 = tasks2.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks2 = tasks2.filter((t) => t.isDone);
  }

  return (
    <div className="App">
      <TodolistLearn
        title={todolistTitle1}
        tasks={filtredTasks}
        date="02.12.2024"
        removeTask={removeTask}
        changeTodolistFilter={changeTodolistFilter}
        addTask={addTask}
      />
      <TodolistRead
        title={todolistTitle2}
        tasks={filtredTasks2}
        date="21.12.2024"
        removeTask={removeTask2}
        changeTodolistFilter={changeTodolistFilter}
        addTask={addtask2}
      />
    </div>
  );
}

export default App;
