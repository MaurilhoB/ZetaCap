import React, { useEffect, useMemo, useState } from 'react';
import { Facebook } from 'react-content-loader';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';
import ErrorView from '../../components/ErrorView';
import Header from '../../components/Header';
import usePreferences from '../../hooks/usePreferences';
import api from '../../services/api';
import { formatCurrency, formatDate, getDatesByInterval } from '../../utils';
import ChartLoader from './ChartLoader';
import {
  Advanced,
  Badge,
  ChartButton,
  ChartContainer,
  Container,
  CryptoImage,
  CryptoInfo,
  CryptoMeta,
  CryptoPriceInfo,
  MainContent,
  MarketInfo,
  Name,
  Symbol,
} from './styles';

interface IRouteParams {
  id: string;
}

interface IMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  last_updated: string;
}

interface IMarketChartData {
  prices: Array<[number, number]>;
}

type IChartInterval = '1h' | '1d' | '3d' | '1w' | '1m' | '1y';

const Market: React.FC = () => {
  const { params } = useRouteMatch<IRouteParams>();
  const crypto_id = params.id;

  const { currency } = usePreferences();
  const theme = useTheme();

  const [marketData, setMarketData] = useState<IMarketData[]>([]);
  const [marketChartData, setMarketChartData] = useState<IMarketChartData>({
    prices: [],
  });
  const [chartInterval, setChartInterval] = useState<IChartInterval>('1d');

  const [chartLoading, setChartLoading] = useState(true);
  const [marketLoading, setMarketLoading] = useState(true);

  const [chartError, setChartError] = useState(false);
  const [marketError, setMarketError] = useState(false);

  useEffect(() => {
    setMarketError(false);
    setMarketLoading(true);

    api
      .get<IMarketData[]>('/coins/markets', {
        params: {
          vs_currency: currency,
          ids: crypto_id,
        },
      })
      .then(response => {
        setMarketData(response.data);
      })
      .catch(() => {
        setMarketError(true);
      })
      .finally(() => [setMarketLoading(false)]);
  }, [currency, crypto_id]);

  useEffect(() => {
    setChartError(false);

    const interval = getDatesByInterval(Date.now(), chartInterval);
    api
      .get<IMarketChartData>(`/coins/${crypto_id}/market_chart/range`, {
        params: {
          vs_currency: currency,
          from: interval?.start,
          to: interval?.end,
        },
      })
      .then(response => {
        setMarketChartData(response.data);
      })
      .catch(() => {
        setChartError(true);
      })
      .finally(() => {
        setChartLoading(false);
      });
  }, [crypto_id, currency, chartInterval]);

  const chartData = useMemo(
    () =>
      marketChartData.prices.map(([date, value]) => ({
        date: date,
        value: value,
      })),
    [marketChartData],
  );

  return (
    <Container>
      <Header />
      <MainContent>
        {marketLoading ? (
          <Facebook />
        ) : marketError ? (
          <ErrorView title="Erro!" message="Erro ao obter dados de mercado" />
        ) : (
          <>
            <CryptoInfo>
              <CryptoImage src={marketData[0].image} alt={marketData[0].name} />
              <CryptoMeta>
                <Name>
                  #{`${marketData[0].market_cap_rank} ${marketData[0].name}`}
                </Name>
                <Symbol>{marketData[0].symbol.toUpperCase()}</Symbol>
              </CryptoMeta>
              <CryptoPriceInfo>
                <h4>{formatCurrency(currency)(marketData[0].current_price)}</h4>
                <Badge
                  color="#fff"
                  bgcolor={
                    marketData[0].price_change_percentage_24h < 0
                      ? '#e63946'
                      : '#52b788'
                  }
                >
                  {marketData[0].price_change_percentage_24h < 0 ? (
                    <FiChevronDown size={16} />
                  ) : (
                    <FiChevronUp size={16} />
                  )}
                  {marketData[0].price_change_percentage_24h.toFixed(4)}%
                </Badge>
              </CryptoPriceInfo>
            </CryptoInfo>

            <MarketInfo>
              <div>
                <h4>Variação em 24h</h4>
                <Badge bgcolor="#52b788" color="#fff">
                  Alto {formatCurrency(currency)(marketData[0].high_24h)}
                </Badge>
                <Badge bgcolor="#e63946" color="#fff">
                  Baixo {formatCurrency(currency)(marketData[0].low_24h)}
                </Badge>
              </div>

              <Advanced>
                <div>
                  <h4>Capitalização de mercado</h4>
                  <span>
                    {formatCurrency(currency)(marketData[0].market_cap)}
                  </span>
                </div>

                <div>
                  <h4>Volume</h4>
                  <span>
                    {formatCurrency(currency)(marketData[0].total_volume)}
                  </span>

                  <h4>Volume / Cap. Mercado</h4>
                  <span>
                    {(
                      marketData[0].total_volume / marketData[0].market_cap
                    ).toFixed(5)}
                  </span>
                </div>

                <div>
                  <h4>Fornecimento Circulante</h4>
                  <span>
                    {new Intl.NumberFormat().format(
                      marketData[0].circulating_supply,
                    )}{' '}
                    {marketData[0].symbol.toUpperCase()}
                  </span>
                </div>
              </Advanced>
            </MarketInfo>
          </>
        )}
        {chartLoading ? (
          <ChartLoader />
        ) : chartError ? (
          <ErrorView
            title="Erro!"
            message="Erro ao obter os dados do gráfico"
          />
        ) : (
          <ChartContainer>
            <h1>Gráfico de preço</h1>
            <div>
              <h6>Intervalo</h6>
              <ChartButton
                onClick={() => setChartInterval('1h')}
                focused={chartInterval === '1h'}
              >
                1H
              </ChartButton>
              <ChartButton
                onClick={() => setChartInterval('1d')}
                focused={chartInterval === '1d'}
              >
                1D
              </ChartButton>
              <ChartButton
                onClick={() => setChartInterval('3d')}
                focused={chartInterval === '3d'}
              >
                3D
              </ChartButton>
              <ChartButton
                onClick={() => setChartInterval('1w')}
                focused={chartInterval === '1w'}
              >
                7D
              </ChartButton>
              <ChartButton
                onClick={() => setChartInterval('1m')}
                focused={chartInterval === '1m'}
              >
                1M
              </ChartButton>
              <ChartButton
                onClick={() => setChartInterval('1y')}
                focused={chartInterval === '1y'}
              >
                1A
              </ChartButton>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                width={500}
                height={300}
                style={{ fontFamily: 'Nunito' }}
              >
                <XAxis
                  type="number"
                  name="Data"
                  dataKey="date"
                  stroke={theme.colors.text_primary}
                  domain={['dataMin', 'dataMax']}
                  interval="preserveStartEnd"
                  tickCount={5}
                  tickFormatter={
                    chartData.length ? time => formatDate(time) : undefined
                  }
                />
                <YAxis
                  dataKey="value"
                  stroke={theme.colors.text_primary}
                  tickFormatter={(value: number) =>
                    new Intl.NumberFormat(undefined, {
                      notation: 'compact',
                    }).format(value)
                  }
                />
                <Tooltip
                  labelFormatter={formatDate}
                  formatter={(value: number) =>
                    new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency,
                    }).format(value)
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  format="currency"
                  name="Preço"
                  stroke={theme.colors.primary}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </MainContent>
    </Container>
  );
};

export default Market;
