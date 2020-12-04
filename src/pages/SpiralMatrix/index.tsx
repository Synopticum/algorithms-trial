import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  margin: 0 auto;

  td {
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
    text-align: center;
    vertical-align: middle;
  }
`;

function matrix(n: number): number[][] {
  const createEmptyMatrix = (n: number): number[][] => {
    const matrix = [];
    for (let i = 0; i < n; i++) {
      matrix.push(new Array(n).fill(null));
    }

    return matrix;
  };

  const m = createEmptyMatrix(n);
  let direction = 'right';
  let done = false;
  let currentRow = 0;
  let currentCol = 0;
  let currentValue = 1;

  m[currentRow][currentCol] = currentValue;

  while (!done) {
    switch (direction) {
      case 'right':
        if (m[currentRow][currentCol + 1] === null) {
          currentValue++;
          currentCol++;
          m[currentRow][currentCol] = currentValue;
        } else {
          // check if last
          if (m[currentRow + 1] && m[currentRow + 1][currentCol] !== null) {
            done = true;
            break;
          }
          direction = 'down';
        }

        break;

      case 'down':
        if (m[currentRow + 1] && m[currentRow + 1][currentCol] === null) {
          currentValue++;
          currentRow++;
          m[currentRow][currentCol] = currentValue;
        } else {
          if (m[currentRow][currentCol - 1] !== null) {
            done = true;
            break;
          }
          direction = 'left';
        }
        break;

      case 'left':
        if (m[currentRow][currentCol - 1] === null) {
          currentValue++;
          currentCol--;
          m[currentRow][currentCol] = currentValue;
        } else {
          if (m[currentRow - 1] && m[currentRow - 1][currentCol] !== null) {
            done = true;
            break;
          }
          direction = 'top';
        }
        break;

      case 'top':
        if (m[currentRow - 1] && m[currentRow - 1][currentCol] === null) {
          currentValue++;
          currentRow--;
          m[currentRow][currentCol] = currentValue;
        } else {
          if (m[currentRow][currentCol + 1] !== null) {
            done = true;
            break;
          }
          direction = 'right';
        }
        break;
    }
  }

  return m;
}

type Props = {};

const SpiralMatrix: React.FC<Props> = () => {
  const result: number[][] = matrix(8);

  return (
    <Table>
      <tbody>
        {result.map((rowValue, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={rowIndex}>
            {rowValue.map((colValue, colIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={colIndex}>{JSON.stringify(colValue)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SpiralMatrix;
