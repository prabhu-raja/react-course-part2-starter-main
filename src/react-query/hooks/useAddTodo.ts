import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Todo } from './useTodos';
import { CACHE_KEY_TODOS } from '../constants';

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data);
    },

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (allTodos = []) => {
        return [newTodo, ...allTodos];
      });

      // if (ref.current) ref.current.value = '';
      onAdd();
      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (allTodos) => {
        return allTodos?.map((todo, indx) => {
          // return todo === newTodo ? savedTodo : todo;
          if (todo.title === newTodo.title) {
            return savedTodo;
          } else {
            return todo;
          }
        });
      });
    },

    onError: (err, newTodo, contxt) => {
      if (!contxt) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, contxt.previousTodos);
      // const prevTodos = queryClient.getQueryData<Todo[]>(['todos']);
      // queryClient.setQueryData<Todo[]>(['todos'], prevTodos);
    },
  });
};

export default useAddTodo;
