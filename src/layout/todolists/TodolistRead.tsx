import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { HeaderTodolist } from "../header/HeaderTodolist";
import { eventNames } from "process";

type TodolistReadProsType = {
  title: string;
  date: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  addTask: (title: string) => void;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, newStatus: boolean) => void;
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
};

export const TodolistRead = (props: TodolistReadProsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<boolean>(false);

  let tasksList2 =
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

  const addTaskHandler2 = () => {
    const trimmedTitile = taskTitle.trim();
    if (trimmedTitile) {
      props.addTask(taskTitle);
    }
    setTaskTitle("");
  };

  const setLocalTitileHandler2 = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTaskTitle(event.currentTarget.value);
  };

  const onNewTitileKeyDownHandler2 = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (taskTitle.length && isAddTaskPossible && event.key === "Enter") {
      addTaskHandler2();
    }
  };

  return (
    <div className="todolist">
      <HeaderTodolist title={props.title} />
      <div>
        <input
          value={taskTitle}
          onChange={setLocalTitileHandler2}
          onKeyDown={onNewTitileKeyDownHandler2}
          className={error ? "error" : ""}
        />
        <Button
          title="+"
          onClickHandler={addTaskHandler2}
          isButtonDisabled={!taskTitle.length || !isAddTaskPossible}
        />
      </div>
      {!taskTitle.length && <div>Enter title name (max 10 symbols)</div>}
      {!isAddTaskPossible && (
        <div className="error-message">Task name is long</div>
      )}
      {error && <div className="error-message">Task title is required</div>}
      {tasksList2}
      <FilterButtons
        filter={props.filter}
        changeTodolistFilter={props.changeTodolistFilter}
      />
      <div>{props.date}</div>
    </div>
  );
};
