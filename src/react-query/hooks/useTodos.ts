import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import APIClient from '../services/apiClient';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const apiClient = new APIClient<Todo>('/todos');

const useTodos = () => {
  // const fetchTodos = () =>
  //   axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
    // queryFn: fetchTodos,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
