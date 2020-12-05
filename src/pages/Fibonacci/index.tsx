import React from 'react';

type Props = {};

// iterative solution
const fib = (n: number): number => {
  let prev = null;
  let current = 0;
  let next = 1;

  for (let i = 0; i < n; i++) {
    prev = current;
    current = next;
    next = prev + current;
  }

  return current;
};

const Fibonacci: React.FC<Props> = () => {
  return <div>Hello Fibonacci {fib(7)}</div>;
};

export default Fibonacci;
