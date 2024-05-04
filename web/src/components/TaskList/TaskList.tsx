import { TaskItem } from "./TaskItem";

interface TaskListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasks: any[];
  setErrorMsg: (msg: string) => void;
}

export function TaskList({ tasks, setErrorMsg }: TaskListProps) {
  return (
    <div className="mt-4 w-full">
      {tasks.map(({ id, name, completed }) => (
        <TaskItem
          key={id}
          id={id}
          name={name}
          completed={completed}
          setErrorMsg={setErrorMsg}
        />
      ))}
    </div>
  );
}
