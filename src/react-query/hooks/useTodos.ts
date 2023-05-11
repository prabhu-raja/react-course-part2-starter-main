import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 10 * 1000,
  });
};

export default useTodos;

// const [todos, setTodos] = useState<Todo[]>([]);
// const [error, setError] = useState('');

// useEffect(() => {
//   axios
//     .get('https://jsonplaceholder.typicode.com/todos')
//     .then((res) => setTodos(res.data))
//     .catch((error) => setError(error));
// }, []);
