import { gql, useMutation } from "@apollo/client";
import { FormEvent, useRef } from "react";
import { GET_TASKS } from "../../hooks";

interface TaskFormProps {
  setErrorMsg: (msg: string) => void;
}

const CREATE_NEW_TASK = gql`
  mutation TaskCreate($name: String!, $desc: String) {
    taskCreate(
      input: { taskInput: { name: $name, description: $desc, userId: 1 } }
    ) {
      task {
        id
      }
    }
  }
`;

export function TaskForm({ setErrorMsg }: TaskFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [createTask, { loading }] = useMutation(CREATE_NEW_TASK, {
    refetchQueries: [GET_TASKS],
    onError: () => {
      setErrorMsg("Something went wrong");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameRef.current == null || nameRef.current.value.length === 0) {
      return;
    }

    if (descriptionRef.current == null) {
      createTask({ variables: { name: nameRef.current.value } });
      nameRef.current.value = "";
      return;
    }

    createTask({
      variables: {
        name: nameRef.current.value,
        desc: descriptionRef.current.value,
      },
    });

    nameRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <form
      className="flex flex-col gap-2 items-end p-2 pb-0 mt-6"
      onSubmit={handleSubmit}
    >
      <input
        ref={nameRef}
        className="input input-ghost input-bordered input-info w-full max-w-xs"
        type="text"
        placeholder="Enter task name"
      />
      <textarea
        ref={descriptionRef}
        className="textarea  textarea-ghost textarea-boardered textarea-info textarea-md w-full max-w-xs"
        placeholder="Enter task description"
      ></textarea>
      {loading ? (
        <button className="btn btn-primary" type="submit">
          <span className="loading loading-spinner"></span>Loading
        </button>
      ) : (
        <button className="btn btn-accent self-end" type="submit">
          Create Task
        </button>
      )}
    </form>
  );
}
