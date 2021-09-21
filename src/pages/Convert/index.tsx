import React from 'react';
import Header from '../../components/Header';
import { FiChevronDown } from 'react-icons/fi';

import {
  Container,
  Converter,
  Input,
  InputContainer,
  SelectedCrypto,
} from './styles';

const Convert: React.FC = () => {
  return (
    <Container>
      <Header />
      <Converter>
        <h1>Conversor</h1>
        <InputContainer label="De">
          <Input disabled type="number" defaultValue="0" />
          <SelectedCrypto>
            <img
              alt="selected coin from"
              src="https://cryptoicon-api.vercel.app/api/icon/btc"
            />
            <p>BTC</p>
          </SelectedCrypto>
          <FiChevronDown size={20} />
        </InputContainer>

        <InputContainer label="Para">
          <Input disabled type="number" defaultValue="0" />
          <SelectedCrypto>
            <img
              alt="selected coin to"
              src="https://cryptoicon-api.vercel.app/api/icon/eth"
            />
            <p>ETH</p>
          </SelectedCrypto>
          <FiChevronDown size={20} />
        </InputContainer>
      </Converter>
    </Container>
  );
};

export default Convert;
