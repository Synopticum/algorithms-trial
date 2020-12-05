import React from 'react';

type Props = {};

// for loop solution
const fib1 = (n: number): number => {
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

// array solution
const fib2 = (n: number): number => {
  const result = [0, 1];

  for (let i = 1; i < n; i++) {
    result.push(result[i] + result[i - 1]);
  }

  return result[n];
};

const Fibonacci: React.FC<Props> = () => {
  return <div>Hello Fibonacci {fib2(7)}</div>;
};

export default Fibonacci;
