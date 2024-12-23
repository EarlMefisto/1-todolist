import { FilterValuesType } from "../../App";
import { Button } from "./Button";

type FilterButtonsPropsType = {
  changeTodolistFilter: (nextFilter: FilterValuesType) => void;
  filter?: FilterValuesType;
};

export const FilterButtons = (props: FilterButtonsPropsType) => {
  return (
    <div>
      <Button
        classes={props.filter === "active" ? "active-filter-button" : ""}
        title="Active"
        onClickHandler={() => props.changeTodolistFilter("active")}
      />
      <Button
        classes={props.filter === "completed" ? "active-filter-button" : ""}
        title="Completed"
        onClickHandler={() => props.changeTodolistFilter("completed")}
      />
      <Button
        classes={props.filter === "all" ? "active-filter-button" : ""}
        title="All"
        onClickHandler={() => props.changeTodolistFilter("all")}
      />
    </div>
  );
};
