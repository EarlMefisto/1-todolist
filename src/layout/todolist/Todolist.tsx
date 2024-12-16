import { ChangeEvent, useRef, useState } from "react";
import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { HeaderTodolist } from "../header/HeaderTodolist";

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date?: string;
  removeTask: (taskId: string) => void;
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export function Todolist(props: TodolistPropsType) {
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
            <Button title="x" onClickHandler={() => props.removeTask(t.id)} />
          </li>
        ))}
      </ul>
    );

  const isAddTaskPossible = taskTitle.length <= 10;

  const addTaskHandler = () => {
    props.addTask(taskTitle);
    setTaskTitle("");
  };
  

  return (
    <div className="todolist">
      <HeaderTodolist title={props.title} />
      <div>
        {/* <input ref={TaskInputRef} /> */}
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
          onKeyDown={event => {
            if (event.key === "Enter") {
              addTaskHandler()
            }
          }}
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
