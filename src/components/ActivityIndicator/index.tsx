import React from 'react';

import { Container, Loader } from './styles';

const ActivityIndicator: React.FC = () => (
  <Container>
    <Loader>
      <div></div>
      <div></div>
    </Loader>
  </Container>
);

export default ActivityIndicator;
