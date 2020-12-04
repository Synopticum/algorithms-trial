import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const Ul = styled.ul`
  list-style: disc outside;
  margin: 0 0 0 20px;
`;

const Li = styled.li`
  padding: 0;
`;

const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: underline;
`;

type Props = {};

const Home: React.FC<Props> = () => {
  return (
    <ErrorBoundary>
      <Content>
        <Ul>
          <Li>
            <NavLink to={'/spiral-matrix/'}>Spiral Matrix</NavLink>
          </Li>
        </Ul>
      </Content>
    </ErrorBoundary>
  );
};

export default Home;
