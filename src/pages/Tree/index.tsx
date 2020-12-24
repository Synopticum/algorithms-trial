import React, { useRef, useState } from 'react';
import { Button, Content, Controls, Log, Result, State } from 'src/pages/shared';

class Node {
  public data: unknown;
  public children: Node[];

  constructor(data: unknown) {
    this.data = data;
    this.children = [];
  }

  add(data: unknown): void {
    this.children.push(new Node(data));
  }

  remove(data: unknown): void {
    this.children = this.children.filter(node => {
      return node.data !== data;
    });
  }
}

class TreeImpl {
  public root: Node;

  constructor(root: Node = null) {
    this.root = root;
  }

  traverseBF(fn: (Node: Node) => void): void {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      arr.push(...node.children);
      fn(node);
    }
  }

  traverseDF(fn: (Node: Node) => void): void {
    const arr = [this.root];
    while (arr.length) {
      const node = arr.shift();

      arr.unshift(...node.children);
      fn(node);
    }
  }
}

type Props = {};

const Tree: React.FC<Props> = () => {
  const node = new Node(123);
  node.children = [new Node(234), new Node(345)];
  node.children[0].children = [new Node(876)];

  const tree = useRef(new TreeImpl(node));
  const [state, setState] = useState(tree.current);
  const [log, setLog] = useState('');

  const updateStateImmutably = (tree: TreeImpl): void => {
    const updatedTree = Object.assign({}, tree);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    setState(updatedList);
  };

  return (
    <Content>
      <Result>
        <State>{JSON.stringify(tree, null, 4)}</State>
        <Log>{log}</Log>
      </Result>
      <Controls>
        <Button
          onClick={(): void => {
            const result: unknown[] = [];
            tree.current.traverseBF(node => result.push(node.data));
            setLog(JSON.stringify(result));
          }}
        >
          traverseBF()
        </Button>
        <Button
          onClick={(): void => {
            const result: unknown[] = [];
            tree.current.traverseDF(node => result.push(node.data));
            setLog(JSON.stringify(result));
          }}
        >
          traverseDF()
        </Button>
      </Controls>
    </Content>
  );
};

export default Tree;
