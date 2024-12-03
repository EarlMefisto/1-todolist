import { TaskType } from "../../App";
import { FilterButtons } from "../../components/Buttons/FilterButtons";
import { Form } from "../../components/Form";
import { Header } from "../header/Header";

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  date?: string;
};

export function Todolist({ title, tasks, date }: TodolistPropsType) {
  //условный рендеринг
  const tasksList =
    tasks.length === 0 ? (
      <span>Your todolist is empty</span>
    ) : (
      <ul>
        {tasks.map((t) => {
          return (
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
    );

  return (
    <div className="todolist">
      <Header title={title} />
      <Form />
      <ul>{tasksList}</ul>
      <FilterButtons />
      <div>{date}</div>
    </div>
  );
}
