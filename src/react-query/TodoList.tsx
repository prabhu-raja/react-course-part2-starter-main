import useTodos from './hooks/useTodos';

const TodoList = () => {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <p>Loading..</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

// const [posts, setPosts] = useState<Post[]>([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((error) => setError(error));
  // }, []);