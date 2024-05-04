import { useState } from "react";
import { TaskForm, TaskList, UserNotification } from "./components";
import { useUserTasks } from "./hooks";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const clearMessage = () => setMessage("");

  const { loading, error, data } = useUserTasks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { user } = data;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4">Task Manager</h1>
      <div className="min-h-24">
        <UserNotification message={message} clearMessage={clearMessage} />
      </div>
      <TaskForm setErrorMsg={setMessage} />
      <div className="divider"></div>
      <TaskList tasks={user.tasks} setErrorMsg={setMessage} />
    </div>
  );
}

export default App;
