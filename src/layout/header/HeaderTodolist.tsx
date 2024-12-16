type HeaderPropsType = {
    title: string
}

export const HeaderTodolist = ({ title }: HeaderPropsType) => {
  return <h3>{title}</h3>;
};