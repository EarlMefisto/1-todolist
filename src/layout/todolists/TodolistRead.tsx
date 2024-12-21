import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { HeaderTodolist } from "../header/HeaderTodolist";

type TodolistReadProsType = {
  title: string;
  date: string;
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const TodolistRead = (props: TodolistReadProsType) => {
  let tasksList2 =
    props.tasks.length === 0 ? (
      <span>Your todolist is empty</span>
    ) : (
      <ul>
        {props.tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <Button title="X" onClickHandler={() => props.removeTask(t.id)} />
          </li>
        ))}
      </ul>
    );

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask2 = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const onNewTitileChangeHandler2 = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const onNewTitileKeyDownHandler2 = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="todolist">
      <HeaderTodolist title={props.title} />
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitileChangeHandler2}
          onKeyDown={onNewTitileKeyDownHandler2}
        />
        <Button
          title="+"
          onClickHandler={addTask2}
        />
      </div>
      {tasksList2}
      <FilterButtons changeTodolistFilter={props.changeTodolistFilter} />
      <div>{props.date}</div>
    </div>
  );
};
