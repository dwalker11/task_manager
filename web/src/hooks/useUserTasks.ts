import { gql, useQuery } from "@apollo/client";

export const GET_TASKS = gql`
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

export function useUserTasks() {
  const { loading, error, data } = useQuery(GET_TASKS);
  return { loading, error, data };
}
