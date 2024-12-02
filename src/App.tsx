import "./App.css";
import { Todolist } from "./layout/todolist/Todolist";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

function App() {
  const todolistTitle1 = "What to learn";
  const todolistTitle2 = "What to buy";

  const task_1: Array<TaskType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
  ];

  const task_2: TaskType[] = [
    { id: 4, title: "Meat", isDone: true },
    { id: 5, title: "Bear", isDone: true },
    { id: 6, title: "Water", isDone: false },
  ];

  return (
    <div className="App">
      <Todolist title={todolistTitle1} tasks={task_1} />
      <Todolist title={todolistTitle2} tasks={task_2} />
    </div>
  );
}

export default App;
 