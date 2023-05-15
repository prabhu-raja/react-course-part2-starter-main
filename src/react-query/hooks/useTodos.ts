import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import todoService, { Todo } from '../services/todoService';

// const apiClient = new APIClient<Todo>('/todos');

const useTodos = () => {
  // const fetchTodos = () =>
  //   axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    // queryFn: apiClient.getAll,
    // queryFn: fetchTodos,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
