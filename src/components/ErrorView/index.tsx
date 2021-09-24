import React from 'react';

import { Container, Title, Message } from './styles';

interface IErrorView {
  title?: string;
  message?: string;
}

const ErrorView: React.FC<IErrorView> = ({ message, title }) => (
  <Container>
    <Title>{title}</Title>
    <Message>{message}</Message>
  </Container>
);

export default ErrorView;
