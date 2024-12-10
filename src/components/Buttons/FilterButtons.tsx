import { FilterValuesType } from "../../App";
import { Button } from "./Button";

type FilterButtonsPropsType = {
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
};

export const FilterButtons = ({
  changeTodolistFilter,
}: FilterButtonsPropsType) => {
  return (
    <div>
      <Button
        title="Active"
        onClickHandler={() => changeTodolistFilter("active")}
      />
      <Button
        title="Completed"
        onClickHandler={() => changeTodolistFilter("completed")}
      />
      <Button title="All" onClickHandler={() => changeTodolistFilter("all")} />
    </div>
  );
};
