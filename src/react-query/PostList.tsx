import usePosts from './hooks/usePosts';

const PostList = () => {
  const { data: posts, error, isLoading } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select className="form-select mb-3">
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;


// const [posts, setPosts] = useState<Post[]>([]);
// const [error, setError] = useState('');

// useEffect(() => {
//   axios
//     .get('https://jsonplaceholder.typicode.com/posts')
//     .then((res) => setPosts(res.data))
//     .catch((error) => setError(error));
// }, []);