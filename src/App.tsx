import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./layout/todolist/Todolist";
import { v1 } from "uuid";

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
  const todolistTitle1 = "What to learn";
  let [tasks, setNextTasks] = React.useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
  ]);

  //TaskType[] и Array<TaskType>: могут использоваться обе формы, но лучше Array<TaskType>

  const removeTask = (taskId: string) => {
    const nextState: Array<TaskType> = tasks.filter((t) => t.id !== taskId);
    setNextTasks(nextState);
    // console.log(tasks);
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

  //UI
  const [filter, setNextFilter] = React.useState<FilterValuesType>("all");

  const changeTodolistFilter = (nextFilter: FilterValuesType) => {
    setNextFilter(nextFilter);
  };

  let filtredTasks: Array<TaskType> = tasks;
  if (filter === "active") {
    filtredTasks = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filtredTasks = tasks.filter((t) => t.isDone);
  }

  return (
    <div className="App">
      <Todolist
        title={todolistTitle1}
        tasks={filtredTasks}
        date="02.12.2024"
        removeTask={removeTask}
        changeTodolistFilter={changeTodolistFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
