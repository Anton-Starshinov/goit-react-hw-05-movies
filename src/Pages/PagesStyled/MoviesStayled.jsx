import styled from 'styled-components';

export const FormStyled = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 30px;
`;

export const InputStyled = styled.input`
  border-radius: 4px;
  width: 400px;
  height: 30px;
  margin-right: 10px;
`;

export const ButtonStyled = styled.button`
  border-radius: 4px;
  border: none;
  padding: 5px;
  height: 35px;
  width: 110px;
  font-size: 16px;
  font-weight: 500;
  color: black;
  :hover,
  :focus-visible {
    color: white;
    background-color: orangered;
  }
`;
