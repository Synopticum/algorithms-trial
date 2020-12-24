import React, { Dispatch, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

class Node {
  constructor(data: unknown, next: Node = null) {
    this.data = data;
    this.next = next;
  }

  public data: unknown;
  public next: Node;
}

class LinkedListImpl {
  constructor() {
    this.head = null;
  }

  public head: Node;

  insertFirst(data: unknown): void {
    this.head = new Node(data, this.head);
  }

  size(): number {
    let currentNode = this.head;
    let size = 0;

    while (currentNode !== null) {
      size++;
      currentNode = currentNode.next;
    }

    return size;
  }

  getFirst(): Node {
    return this.getAt(0);
  }

  getLast(): Node {
    return this.getAt(this.size() - 1);
  }

  clear(): void {
    this.head = null;
  }

  removeFirst(): void {
    if (!this.head) return null;
    this.head = this.head.next;
  }

  removeLast(): void {
    if (!this.head) return null;
    if (this.head.next === null) {
      this.head = null;
      return;
    }

    let previousNode = this.head;
    let node = this.head.next;

    while (node) {
      if (node.next === null) {
        previousNode.next = null;
        return;
      }

      previousNode = node;
      node = node.next;
    }
  }

  insertLast(data: unknown): void {
    const last = this.getLast();

    if (last) {
      last.next = new Node(data);
    } else {
      this.insertFirst(data);
    }
  }

  getAt(index: number): Node {
    let node = this.head;

    if (!node) return null;

    for (let i = 0; i <= index; i++) {
      if (i === index) {
        return node;
      } else {
        if (!node) return null;
        node = node.next;
      }
    }
  }

  removeAt(index: number): void {
    if (!this.head) {
      return null;
    } else if (index === 0) {
      this.head = this.head.next;
    } else {
      const node = this.getAt(index - 1);

      if (!node || !node.next) {
        return null;
      }

      node.next = node.next.next;
    }
  }

  insertAt(data: unknown, index: number): void {
    if (!this.head || index === 0) {
      this.insertFirst(data);
    } else {
      const node = this.getAt(index - 1);

      if (!node || !node.next) {
        this.insertLast(data);
      } else {
        node.next = new Node(data, node.next);
      }
    }
  }

  forEach(callback: (node: Node, index: number) => void): void {
    let node = this.getFirst();
    const size = this.size();

    for (let i = 0; i < size; i++) {
      callback(node, i);
      node = node.next;
    }
  }

  *[Symbol.iterator](): Generator<Node, void, Node> {
    let node = this.head;

    while (node) {
      yield node;
      node = node.next;
    }
  }

  midpoint(): Node {
    if (!this.head) return null;
    if (!this.head.next) return this.head;

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  circular(): boolean {
    if (!this.head || !this.head.next) return null;

    let slow = this.head;
    let fast = this.head;

    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true;
      }
    }

    return false;
  }
}

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Result = styled.div`
  flex: 3;
  margin-right: 20px;
`;

const State = styled.pre`
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const Log = styled.pre`
  color: #666666;
  line-height: 1.4;
`;

const Controls = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  display: block;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 0;
  outline: none;
  background-color: #eeeeee;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fafafa;
  }
`;

type Props = {};

const LinkedList: React.FC<Props> = () => {
  const list = useRef(new LinkedListImpl());
  const [state, setState] = useState(list.current);
  const [log, setLog] = useState('');

  const updateStateImmutably = (list: LinkedListImpl): void => {
    const updatedList = Object.assign({}, list);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    setState(updatedList);
  };

  return (
    <Content>
      <Result>
        <State>{JSON.stringify(state, null, 4)}</State>
        <Log>{log}</Log>
      </Result>
      <Controls>
        <Button
          onClick={(): void => {
            list.current.insertFirst(Math.floor(Math.random() * 1000) + 1);
            updateStateImmutably(list.current);
          }}
        >
          insertFirst()
        </Button>
        <Button
          onClick={(): void => {
            list.current.removeFirst();
            updateStateImmutably(list.current);
          }}
        >
          removeFirst()
        </Button>
        <Button
          onClick={(): void => {
            list.current.insertLast(Math.floor(Math.random() * 1000) + 1);
            updateStateImmutably(list.current);
          }}
        >
          insertLast()
        </Button>
        <Button
          onClick={(): void => {
            list.current.removeLast();
            updateStateImmutably(list.current);
          }}
        >
          removeLast()
        </Button>
        <Button
          onClick={(): void => {
            list.current.clear();
            updateStateImmutably(list.current);
          }}
        >
          clear()
        </Button>
        <Button
          onClick={(): void => {
            setLog(`Size: ${list.current.size().toString()}`);
          }}
        >
          size()
        </Button>
        <Button
          onClick={(): void => {
            const index = prompt('Enter index');
            setLog(JSON.stringify(list.current.getAt(parseInt(index))));
          }}
        >
          getAt()
        </Button>
        <Button
          onClick={(): void => {
            const value = prompt('Enter value');
            const index = prompt('Enter index');
            list.current.insertAt(value, parseInt(index));
            updateStateImmutably(list.current);
          }}
        >
          insertAt()
        </Button>
        <Button
          onClick={(): void => {
            setLog(`Midpoint: ${JSON.stringify(list.current.midpoint())}`);
          }}
        >
          midpoint()
        </Button>
        <Button
          onClick={(): void => {
            setLog(`Is circular: ${JSON.stringify(list.current.circular())}`);
          }}
        >
          circular()
        </Button>
      </Controls>
    </Content>
  );
};

export default LinkedList;
