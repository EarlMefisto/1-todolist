import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { HeaderTodolist } from "../header/HeaderTodolist";

export type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date: string;
  removeTask: (taskId: string) => void;
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export function TodolistLearn(props: TodolistPropsType) {
  // const TaskInputRef = useRef<HTMLInputElement>(null);

  const [taskTitle, setTaskTitle] = useState("");
  //условный рендеринг
  const tasksList =
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

  const isAddTaskPossible = taskTitle.length <= 10;

  const addTaskHandler = () => {
    props.addTask(taskTitle);
    setTaskTitle("");
  };

  const onNewTitileChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(event.currentTarget.value);

  const onNewTitileKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div className="todolist">
      <HeaderTodolist title={props.title} />
      <div>
        {/* <input ref={TaskInputRef} /> */}
        <input
          value={taskTitle}
          onChange={onNewTitileChangeHandler}
          onKeyDown={onNewTitileKeyDownHandler}
        />
        <Button
          title="+"
          onClickHandler={addTaskHandler}
          isButtonDisabled={!taskTitle.length && !isAddTaskPossible}
          // onClickHandler={() => {
          //   if (TaskInputRef.current) {
          //     props.addTask(TaskInputRef.current.value)
          //     TaskInputRef.current.value = ""
          //   }
          // }}
        />
      </div>
      {!taskTitle.length && <div>Enter title name (max lenght 10 symbols)</div>}
      {!isAddTaskPossible && <div>Task name is long</div>}
      {tasksList}
      <FilterButtons changeTodolistFilter={props.changeTodolistFilter} />
      <div>{props.date}</div>
    </div>
  );
}
