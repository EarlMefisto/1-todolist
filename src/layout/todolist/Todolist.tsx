import { FilterValuesType, TaskType } from "../../App";
import { Button } from "../../components/Buttons/Button";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { Form } from "../../components/Form";
import { Header } from "../header/Header";

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  date?: string;
  removeTask: (taskId: number) => void;
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
};

export function Todolist(props: TodolistPropsType) {
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
  return (
    <div className="todolist">
      <Header title={props.title} />
      <Form />
      <ul>{tasksList}</ul>
      <FilterButtons changeTodolistFilter={props.changeTodolistFilter} />
      <div>{props.date}</div>
    </div>
  );
}
