import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "./Buttons/Button";

type AddItemFormType = {
  addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormType) {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<boolean>(false);

  const setLocalTitileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTaskTitle(event.currentTarget.value);
  };

  const isAddTaskPossible = taskTitle.length <= 10;

  const onNewTitileKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (taskTitle.length && isAddTaskPossible && event.key === "Enter") {
      addTaskHandler();
    }
  };

  const addTaskHandler = () => {
    const trimmedTitie = taskTitle.trim();
    if (trimmedTitie) {
      props.addItem(taskTitle);
    } else {
      setError(true);
    }
    setTaskTitle("");
  };

  return (
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
      {!isAddTaskPossible && (
        <div className="error-message">Task name is long</div>
      )}
      {!taskTitle.length && <div>Enter title name (max 10 symbols)</div>}
      {error && <div className="error-message">Task title is required</div>}
    </div>
  );
}
