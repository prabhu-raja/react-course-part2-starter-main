import { useReducer } from 'react';
import counterReducer from './counterReducer';
import useCounterStore from './store';

const Counter = () => {
  // const [value, dispatch] = useReducer(counterReducer, 0);
  const { counter, increment, reset } = useCounterStore();

  return (
    <div>
      Counter ({counter}){/* <button onClick={increment} className="btn btn-primary mx-1"> */}
      <button onClick={() => increment()} className="btn btn-primary mx-1">
        Increment
      </button>
      <button onClick={reset} className="btn btn-primary mx-1">
        Reset
      </button>
      {/* Counter ({value})
      <button onClick={() => dispatch({ type: 'INCREMENT' })} className="btn btn-primary mx-1">
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })} className="btn btn-primary mx-1">
        Reset
      </button> */}
    </div>
  );
};

export default Counter;
