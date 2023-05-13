import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => {
  const fetchPostList = () =>
    axios
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: { userId },
      })
      .then((res) => res.data);

  return useQuery<Post[], Error>({
    /* /users/1/posts */
    queryKey: userId ? ['users', userId, 'posts'] : ['posts'],
    queryFn: fetchPostList,
    staleTime: 10 * 1000,
  });
};

export default usePosts;
