import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
import { Todo } from './hooks/useTodos';

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then((res) => res.data);
    },

    onMutate: (newTodo: Todo) => {
      console.log('mutate');
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (allTodos) => {
        return [newTodo, ...(allTodos || [])];
      });

      if (ref.current) ref.current.value = '';

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      console.log('savedTodo', savedTodo);
      console.log('newTodo', newTodo);

      console.log('before', queryClient.getQueryData(['todos']));
      queryClient.setQueryData<Todo[]>(['todos'], (allTodos) => {
        return allTodos?.map((todo, indx) => {
          // return todo === newTodo ? savedTodo : todo;
          if (todo.title === newTodo.title) {
            console.log('Cond Passed');
            return savedTodo;
          } else {
            return todo;
          }
        });
      });
      console.log('after', queryClient.getQueryData(['todos']));
    },

    onError: (err, newTodo, contxt) => {
      if (!contxt) return;
      queryClient.setQueryData<Todo[]>(['todos'], contxt.previousTodos);
    },
  });

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
