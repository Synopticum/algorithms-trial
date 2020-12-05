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

// recursive solution
const fib3 = (n: number): number => {
  if (n < 2) return n;

  return fib3(n - 1) + fib3(n - 2);
};

const Fibonacci: React.FC<Props> = () => {
  return <div>Hello Fibonacci {fib3(7)}</div>;
};

export default Fibonacci;
