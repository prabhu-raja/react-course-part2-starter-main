import { useReducer, useState } from 'react';
import counterReducer from './reducers/counterReducer';

const Counter = () => {
  // const [value, setValue] = useState(0);
  const [value, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      Counter ({value})
      <button
        onClick={() => dispatch({ type: 'INCREMENT' })}
        // onClick={() => setValue(value + 1)}
        className="btn btn-primary mx-1">
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        // onClick={() => setValue(0)}
        className="btn btn-primary mx-1">
        Reset
      </button>
    </div>
  );
};

export default Counter;
