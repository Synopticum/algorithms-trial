import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

type Props = {};

export const Footer: React.FC<Props> = () => {
  return <StyledFooter>Copyright © 2020 Sergey Novikov</StyledFooter>;
};

export default Footer;
