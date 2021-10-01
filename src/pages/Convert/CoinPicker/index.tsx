import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SearchBar from '../../../components/SearchBar';
import { useTransition } from '@react-spring/web';

import {
  Container,
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
import { formatCurrency } from '../../../utils';

interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  image: string;
}

interface ICoinPickerProps {
  callback(data: ICrypto): void;
  data: ICrypto[];
  shown: boolean;
  currency: 'BRL' | 'USD';
}

const CoinPicker: React.FC<ICoinPickerProps> = ({
  data,
  callback,
  shown,
  currency,
}) => {
  const transition = useTransition(shown, {
    from: { y: '100%' },
    enter: { y: '0%' },
    leave: { y: '100%' },
  });
  const handleCallback = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    e => {
      const target = e.target as any;

      if (target.id === 'crypto-list') {
        return;
      }

      const nativeEvent = e.nativeEvent as any;

      const path = nativeEvent.path as HTMLElement[];

      if (!path || !path.length) {
        return;
      }

      const cryptoHTMLElem = path.find(element => element.dataset.cryptoId);

      if (cryptoHTMLElem) {
        const crypto = data.find(
          crypto => crypto.id === cryptoHTMLElem.dataset.cryptoId,
        );

        if (crypto) callback(crypto);
      }
    },
    [data, callback],
  );

  const [searchTerm, setSearchTerm] = useState('');
  let timerID = useRef<any>();

  const searchHandle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerID) {
      clearTimeout(timerID.current);
    }

    timerID.current = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 180);
  }, []);

  const filteredCryptosList = useMemo(() => {
    if (searchTerm.length === 0) {
      return data;
    }
    return data.filter(crypto => {
      if (
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }, [data, searchTerm]);

  useEffect(() => {
    if (!shown) {
      setSearchTerm('');
    }
  }, [shown]);

  return transition(
    ({ y }, _) =>
      _ && (
        <Container style={{ y }}>
          <div>
            <SearchBar placeholder="Bitcoin..." onChange={searchHandle} />
          </div>

          <CryptoList id="crypto-list" onClick={handleCallback}>
            {filteredCryptosList.map(
              ({
                id,
                image,
                name,
                symbol,
                current_price,
                market_cap_change_percentage_24h,
              }) => (
                <Row key={id} data-crypto-id={id}>
                  <CryptoIcon
                    src={image.replace('large', 'small')}
                    loading="lazy"
                  />
                  <Metadata>
                    <Name>{name}</Name>
                    <Symbol>{symbol?.toUpperCase()}</Symbol>
                  </Metadata>
                  <PriceInfo>
                    <Price>{formatCurrency(currency)(current_price)}</Price>
                    <Status
                      statusColor={
                        market_cap_change_percentage_24h < 0
                          ? '#e63946'
                          : '#52b788'
                      }
                    >
                      {typeof market_cap_change_percentage_24h === 'number'
                        ? market_cap_change_percentage_24h.toFixed(3) + '%'
                        : null}
                    </Status>
                  </PriceInfo>
                </Row>
              ),
            )}
          </CryptoList>
        </Container>
      ),
  );
};

export default CoinPicker;
