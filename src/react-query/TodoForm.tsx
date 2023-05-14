import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Todo } from './hooks/useTodos';
import axios from 'axios';

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo).then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      console.log('savedTodo - ', savedTodo);
      console.log('newTodo', newTodo);
      /*
      * Approach 1: Invalidate the cache in React Query
      queryClient.invalidateQueries({ queryKey: ['todos'] }); 
      * Here the queryKey 'todos' must be same with which used in useTodos-useQuery
      * But this approach 1 won't work since jsonplaceholder is a fake api
      */

      // * Approach 2: Updating data in cache directly
      queryClient.setQueryData<Todo[]>(['todos'], (allTodos) => {
        return [savedTodo, ...(allTodos || [])];
      });

      if (ref.current) ref.current.value = '';
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && <div className="alert alert-danger">{addTodo.error.message}</div>}
      <form
        className="row mb-3"
        onSubmit={(evt) => {
          evt.preventDefault();
          if (ref?.current?.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current.value,
              completed: false,
              userId: 0,
            });
          }
        }}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
