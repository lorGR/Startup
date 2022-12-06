import React from 'react'
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { decrement, increment, selectCounter } from './counterSlice';


const Counter = () => {

    const dispatch = useAppDispatch();
    const counter = useAppSelector(selectCounter)

    const handkeIncrement = () => {
        dispatch(increment());
    }
    const handleDcrement = () => {
        dispatch(decrement());
    }

  return (
    <div>
        {counter}
        <button onClick={handkeIncrement}>+1</button>
        <button onClick={handleDcrement}>-1</button>
    </div>
  )
}

export default Counter