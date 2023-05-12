import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = () => {
  const fetchPostList = () =>
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts').then((res) => res.data);

  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPostList,
    staleTime: 10 * 1000,
  });
};

export default usePosts;
