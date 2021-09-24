import axios from 'axios';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ActivityIndicator from '../../components/ActivityIndicator';
import ErrorView from '../../components/ErrorView';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import usePreferences from '../../hooks/usePreferences';
import api from '../../services/api';

import {
  Container,
  CryptoIcon,
  CryptoList,
  ErrorContainer,
  LoadingContainer,
  MainContent,
  Metadata,
  Name,
  Price,
  PriceInfo,
  Row,
  Status,
  Symbol,
} from './styles';

interface ICryptosList {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  image: string;
}

interface IStoragedList {
  data: ICryptosList[];
  base_currency: string;
  updated_at: string;
}

const Home: React.FC = () => {
  const [cryptosList, setCryptosList] = useState<ICryptosList[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { currency } = usePreferences();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const data = localStorage.getItem('@ZetaCap:markets_list');

    if (data) {
      const storagedList = JSON.parse(data) as IStoragedList;

      if (storagedList.base_currency === currency) {
        const now = new Date().getTime();
        const updatedTime = new Date(storagedList.updated_at).getTime();

        if (now - updatedTime < 180000) {
          setTimeout(() => {
            setCryptosList(storagedList.data);
            setLoading(false);
          }, 500);
          return;
        }
      }
    }

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await api.get<ICryptosList[]>('coins/markets', {
          params: {
            vs_currency: currency.toLowerCase(),
            per_page: 150,
          },
          cancelToken: source.token,
        });
        const { data } = response;

        setCryptosList(data);

        localStorage.setItem(
          '@ZetaCap:markets_list',
          JSON.stringify({
            data,
            base_currency: currency,
            updated_at: new Date().toISOString(),
          }),
        );
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => source.cancel();
  }, [currency]);

  const filteredCryptosList = useMemo(
    () =>
      cryptosList.filter(crypto => {
        if (searchTerm.length === 0) {
          return true;
        }
        if (
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
        return false;
      }),
    [cryptosList, searchTerm],
  );

  let timerID = useRef<any>();

  const searchHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error) return;

      if (timerID) {
        clearTimeout(timerID.current);
      }

      timerID.current = setTimeout(() => {
        setSearchTerm(e.target.value);
      }, 180);
    },
    [error],
  );

  return (
    <Container>
      <Header />
      <MainContent>
        <h1>Mercados</h1>
        <SearchBar onChange={searchHandle} placeholder="Bitcoin..." />

        {loading ? (
          <LoadingContainer>
            <ActivityIndicator />
          </LoadingContainer>
        ) : error ? (
          <ErrorContainer>
            <ErrorView
              title="Houve um erro!"
              message="Erro ao buscar os dados"
            />
          </ErrorContainer>
        ) : (
          <CryptoList>
            {filteredCryptosList.map(crypto => (
              <Row key={crypto.id} to={`/market/${crypto.id}`}>
                <CryptoIcon src={crypto.image.replace('large', 'small')} />
                <Metadata>
                  <Name>{crypto.name}</Name>
                  <Symbol>{crypto.symbol.toUpperCase()}</Symbol>
                </Metadata>
                <PriceInfo>
                  <Price>${crypto.current_price}</Price>
                  <Status
                    statusColor={
                      crypto.market_cap_change_percentage_24h < 0
                        ? '#e63946'
                        : '#52b788'
                    }
                  >
                    {crypto.market_cap_change_percentage_24h.toFixed(3)}%
                  </Status>
                </PriceInfo>
              </Row>
            ))}
          </CryptoList>
        )}
      </MainContent>
    </Container>
  );
};

export default Home;
