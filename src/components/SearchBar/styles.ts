import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: ${props => props.theme.colors.background_primary};

  > svg {
    margin: 0 8px;
    color: ${props => props.theme.colors.text_secondary};
  }
`;

export const Input = styled.input`
  outline: none;
  border: 0;
  padding: 20px 0;
  font-family: 'Nunito';
  background: transparent;
  flex: 1;
`;
