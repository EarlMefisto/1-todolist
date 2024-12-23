type ButtonPropsType = {
  title: string;
  onClickHandler?: () => void;
  isButtonDisabled?: boolean;
  classes?: string;
};

export const Button = (props: ButtonPropsType) => {
  return (
    <button
      className={props.classes}
      disabled={props.isButtonDisabled}
      onClick={props.onClickHandler}
    >
      {props.title}
    </button>
  );
};
