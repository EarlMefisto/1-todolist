import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { HeaderTodolist } from "../header/HeaderTodolist";

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

  const addTaskHandler = () => {
    const trimmedTitie = taskTitle.trim();
    if (trimmedTitie) {
      props.addTask(taskTitle);
    } else {
      setError(true);
    }
    setTaskTitle("");
  };

  const setLocalTitileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTaskTitle(event.currentTarget.value);
  };

  const onNewTitileKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (taskTitle.length && isAddTaskPossible && event.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div className="todolist">
      <HeaderTodolist title={props.title} />
      <div>
        <input
          value={taskTitle}
          onChange={setLocalTitileHandler}
          onKeyDown={onNewTitileKeyDownHandler}
          className={error ? "error" : ""}
        />
        <Button
          title="+"
          onClickHandler={addTaskHandler}
          isButtonDisabled={!taskTitle.length || !isAddTaskPossible}
        />
      </div>
      {!isAddTaskPossible && (
        <div className="error-message">Task name is long</div>
      )}
      {!taskTitle.length && <div>Enter title name (max 10 symbols)</div>}
      {error && <div className="error-message">Task title is required</div>}
      {tasksList}
      <FilterButtons
        filter={props.filter}
        changeTodolistFilter={props.changeTodolistFilter}
      />
      <div>{props.date}</div>
    </div>
  );
}
