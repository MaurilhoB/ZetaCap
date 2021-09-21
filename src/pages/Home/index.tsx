import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

import {
  Container,
  MainContent,
  CryptoList,
  Row,
  CryptoIcon,
  Metadata,
  Name,
  Symbol,
  PriceInfo,
  Price,
  Status,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <MainContent>
        <h1>Mercados</h1>
        <SearchBar placeholder="Bitcoin..." />
        <CryptoList>
          {new Array(10).fill(null).map((_, index) => (
            <Row key={String(index)}>
              <CryptoIcon src="https://cryptoicon-api.vercel.app/api/icon/btc" />
              <Metadata>
                <Name>Bitcoin</Name>
                <Symbol>BTC</Symbol>
              </Metadata>
              <PriceInfo>
                <Price>$48,047.45</Price>
                <Status>+1.82%</Status>
              </PriceInfo>
            </Row>
          ))}
        </CryptoList>
      </MainContent>
    </Container>
  );
};

export default Home;
