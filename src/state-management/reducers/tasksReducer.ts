export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: 'ADD';
  task: Task;
  // payload: Task;
}

interface DeleteTask {
  type: 'DELETE';
  taskId: number;
  // payload: number;
}

export type TaskAction = AddTask | DeleteTask;

const tasksReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD':
      return [action.task, ...state];
    case 'DELETE':
      return state.filter((s) => s.id !== action.taskId);
    default:
      return state;
  }
};

export default tasksReducer;
