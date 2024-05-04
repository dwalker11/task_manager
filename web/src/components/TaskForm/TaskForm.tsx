import { gql, useMutation } from "@apollo/client";
import { FormEvent, useRef } from "react";
import { GET_TASKS } from "../../hooks";

interface TaskFormProps {
  setErrorMsg: (msg: string) => void;
}

const CREATE_NEW_TASK = gql`
  mutation TaskCreate($name: String!) {
    taskCreate(input: { taskInput: { name: $name, userId: 1 } }) {
      task {
        id
      }
    }
  }
`;

export function TaskForm({ setErrorMsg }: TaskFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [createTask, { loading }] = useMutation(CREATE_NEW_TASK, {
    refetchQueries: [GET_TASKS],
    onError: () => {
      setErrorMsg("Something went wrong");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current == null || inputRef.current.value.length === 0) {
      return;
    }

    createTask({ variables: { name: inputRef.current.value } });
    inputRef.current.value = "";
  };

  return (
    <form className="flex mt-6" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="input input-boardered w-full max-w-xs"
        type="text"
        placeholder="Enter task here"
      />
      {loading ? (
        <button className="btn btn-primary" type="submit">
          <span className="loading loading-spinner"></span>Loading
        </button>
      ) : (
        <button className="btn btn-accent" type="submit">
          Create
        </button>
      )}
    </form>
  );
}
