import React from 'react';
import styled from 'styled-components';
import { Employee, Time } from 'src/providers/reducers/employees.slice';
import { Table, Thead, Th, Tbody, Td, Tr } from './Table';

const StyledList = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

type Props = {
  items: Employee[];
};

const getUnproductiveTime = (times: Time[]): number =>
  times.reduce((n, { unproductiveTime }) => n + parseInt(unproductiveTime), 0);

const getTotalClockedInTime = (times: Time[]): number => {
  const ms = times.reduce(
    (n, { clockedIn, clockedOut }) => n + (new Date(clockedOut).getTime() - new Date(clockedIn).getTime()),
    0,
  );

  // format to human readable date-fns
  return ms / 60000;
};

const renderEmployees = (items: Employee[]): React.ReactNode => {
  return items.map(({ id, name, times }) => {
    return (
      <Tr key={id}>
        <Td>{name}</Td>
        <Td>{`${getTotalClockedInTime(times)} min.`}</Td>
        <Td>tbd</Td>
        <Td>{`${getUnproductiveTime(times)} min.`}</Td>
        <Td>tbd</Td>
        <Td>Deactivate</Td>
      </Tr>
    );
  });
};

const List: React.FC<Props> = ({ items }) => {
  return (
    <StyledList>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Total Clocked-in time</Th>
            <Th>Total Productive time</Th>
            <Th>Total Unproductive time</Th>
            <Th>Productivity ratio</Th>
            <Th>-</Th>
          </Tr>
        </Thead>
        <Tbody>{renderEmployees(items)}</Tbody>
      </Table>
    </StyledList>
  );
};

export default List;
