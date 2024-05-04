import { gql, useMutation } from "@apollo/client";
import { GET_TASKS } from "../../hooks";

interface TaskProps {
  id: number;
  name: string;
  completed: boolean;
  setErrorMsg: (msg: string) => void;
}

const TOGGLE_TASK_STATUS = gql`
  mutation TaskToggleStatus($id: ID!) {
    taskToggleStatus(input: { id: $id }) {
      task {
        id
      }
    }
  }
`;

export function TaskItem({ id, name, completed, setErrorMsg }: TaskProps) {
  const [toggleStatus, { loading }] = useMutation(TOGGLE_TASK_STATUS, {
    refetchQueries: [GET_TASKS],
    onError: () => {
      setErrorMsg("Something went wrong");
    },
  });

  const handleChange = () => toggleStatus({ variables: { id: id } });

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
