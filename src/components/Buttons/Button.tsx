type ButtonPropsType = {
  title: string;
  onClickHandler?: () => void;
  isButtonDisabled?: boolean;
};

export const Button = ({
  title,
  onClickHandler,
  isButtonDisabled,
}: ButtonPropsType) => {
  return (
    <button onClick={onClickHandler}>
      {title} {isButtonDisabled}
    </button>
  );
};
