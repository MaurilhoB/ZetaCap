import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  font-family: 'Nunito';
  font-weight: 700;
  color: ${props => props.theme.colors.text_primary};
`;

export const Message = styled.p`
  font-size: 1rem;
  font-family: 'Nunito';
  font-weight: 500;
  color: ${props => props.theme.colors.text_secondary};
`;
