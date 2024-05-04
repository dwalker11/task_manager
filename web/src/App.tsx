import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useRef, useState } from "react";
import "./App.css";

interface TaskFormProps {
  setErrorMsg: (msg: string) => void;
}

interface TaskListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasks: any[];
  setErrorMsg: (msg: string) => void;
}

interface TaskProps {
  id: number;
  name: string;
  completed: boolean;
  setErrorMsg: (msg: string) => void;
}

interface MessageProps {
  message: string;
  clearMessage: () => void;
}

const GET_TASKS = gql`
  query GetTasks {
    user(id: 1) {
      tasks {
        id
        name
        completed
      }
    }
  }
`;

const CREATE_NEW_TASK = gql`
  mutation TaskCreate($name: String!) {
    taskCreate(input: { taskInput: { name: $name, userId: 1 } }) {
      task {
        id
      }
    }
  }
`;

const MARK_TASK_COMPLETED = gql`
  mutation TaskComplete($id: ID!) {
    taskComplete(input: { id: $id }) {
      task {
        id
      }
    }
  }
`;

function App() {
  const [message, setMessage] = useState("");
  const clearMessage = () => setMessage("");

  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { user } = data;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4">Task Manager</h1>
      <div className="min-h-24">
        <Message message={message} clearMessage={clearMessage} />
      </div>
      <TaskForm setErrorMsg={setMessage} />
      <TaskList tasks={user.tasks} setErrorMsg={setMessage} />
    </div>
  );
}

function TaskForm({ setErrorMsg }: TaskFormProps) {
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

function TaskList({ tasks, setErrorMsg }: TaskListProps) {
  return (
    <div className="mt-4 w-full">
      {tasks.map(({ id, name, completed }) => (
        <Task
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

function Task({ id, name, completed, setErrorMsg }: TaskProps) {
  const [markCompleted, { loading }] = useMutation(MARK_TASK_COMPLETED, {
    refetchQueries: [GET_TASKS],
    onError: () => {
      setErrorMsg("Something went wrong");
    },
  });

  const handleChange = () => markCompleted({ variables: { id: id } });

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">
          {loading && <span className="loading loading-ball loading-xs"></span>}
          &nbsp;
          {name}
        </span>
        <input
          className="checkbox"
          type="checkbox"
          checked={completed}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

function Message({ message, clearMessage }: MessageProps) {
  if (message.length === 0) {
    return null;
  }

  return (
    <div role="alert" className="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{message}</span>
      <div>
        <button className="btn btn-circle" onClick={clearMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
