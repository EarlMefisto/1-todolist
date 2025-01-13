import { ChangeEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { HeaderTodolist } from "../header/HeaderTodolist";
import { AddItemForm } from "../../components/AddItemForm";

export type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date: string;
  filter: FilterValuesType;
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, newStatus: boolean) => void;
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
};

export const TodolistLearn = (props: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<boolean>(false);

  const tasksList =
    props.tasks.length === 0 ? (
      <span>Your todolist is empty</span>
    ) : (
      <ul>
        {props.tasks.map((t) => {
          const changeTaskStatusHandler = (
            event: ChangeEvent<HTMLInputElement>
          ) => props.changeTaskStatus(t.id, event.currentTarget.checked);
          return (
            <li>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={changeTaskStatusHandler}
              />
              <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
              <Button title="X" onClickHandler={() => props.removeTask(t.id)} />
            </li>
          );
        })}
      </ul>
    );

  const isAddTaskPossible = taskTitle.length <= 10;

  return (
    <div className="todolist">
      <HeaderTodolist title={props.title} />
      <AddItemForm addItem={props.addTask} />
      {tasksList}
      <FilterButtons
        filter={props.filter}
        changeTodolistFilter={props.changeTodolistFilter}
      />
      <div>{props.date}</div>
    </div>
  );
};
