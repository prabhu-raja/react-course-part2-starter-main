import { useState } from 'react';
import usePosts from './hooks/usePosts';

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <div className="my-3">
        <button className="btn btn-primary" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button className="btn btn-primary ms-1" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
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
