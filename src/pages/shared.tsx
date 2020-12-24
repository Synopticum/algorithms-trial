import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex: 1 0 0;
  width: 100%;
`;

export const Result = styled.div`
  flex: 3;
  margin-right: 20px;
`;

export const State = styled.pre`
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  line-height: 1.4;
`;

export const Log = styled.pre`
  color: #666666;
  line-height: 1.4;
`;

export const Controls = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
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
