import React, { useCallback, useRef, useState, useEffect } from 'react';
import Header from '../../components/Header';
import { FiChevronDown } from 'react-icons/fi';
import api from '../../services/api';

import {
  Container,
  Converter,
  Input,
  InputContainer,
  SelectedCrypto,
} from './styles';
import CoinPicker from './CoinPicker';
import ErrorView from '../../components/ErrorView';
import ConverterLoader from './ConverterLoader';
import usePreferences from '../../hooks/usePreferences';

interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
  image: string;
}

const Convert: React.FC = () => {
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  const [pickerShown, setPickerShown] = useState({ from: false, to: false });
  const [converter, setConverter] = useState({ from: '0', to: '0' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [cryptosList, setCryptosList] = useState<ICrypto[]>([]);
  const [from, setFrom] = useState<ICrypto>({} as ICrypto);
  const [to, setTo] = useState<ICrypto>({} as ICrypto);

  const { currency } = usePreferences();

  const handleSetFrom = useCallback((data: ICrypto) => {
    setFrom(data);
    setPickerShown(prev => ({ ...prev, from: false }));
  }, []);

  const handleSetTo = useCallback((data: ICrypto) => {
    setTo(data);
    setPickerShown(prev => ({ ...prev, to: false }));
  }, []);

  const handleFocusFrom = useCallback((e: any) => {
    const input = fromInputRef.current;
    if (!input) return;

    if (e.target.nodeName === 'INPUT' && !input.disabled) {
      return;
    }

    setPickerShown(prev => ({ ...prev, from: true }));

    setConverter(prev => ({ ...prev, from: '' }));
    input.disabled = false;
    input.focus();
  }, []);

  const handleFocusTo = useCallback((e: any) => {
    const input = toInputRef.current;
    if (!input) return;

    if (e.target.nodeName === 'INPUT' && !input.disabled) {
      return;
    }

    setPickerShown(prev => ({ ...prev, to: true }));
    setConverter(prev => ({ ...prev, to: '' }));
    input.disabled = false;
  }, []);

  const handleNormalConversion = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value.replace(',', '.');

      const validNumber = new RegExp(
        /^[+-]?([0-9]+[,.]?[0-9]*|[,.][0-9]+)$/,
      ).test(text);

      if (validNumber) {
        if (from.current_price === to.current_price) {
          setConverter(_ => ({
            to: text,
            from: text,
          }));
          return;
        }

        if (text.length > 16) {
          return;
        }

        const inputValue = Number(text);
        const result = (from.current_price * inputValue) / to.current_price;

        if (!isNaN(inputValue) && !isNaN(result)) {
          const to = String(parseFloat(result.toFixed(3)));

          setConverter(_ => ({
            from: text,
            to,
          }));
        }
      }

      if (!text.length) {
        setConverter(_ => ({ from: text, to: '0' }));
      }
    },
    [from.current_price, to.current_price],
  );

  const handleReverseConversion = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value.replace(',', '.');

      const validNumber = new RegExp(
        /^[+-]?([0-9]+[,.]?[0-9]*|[,.][0-9]+)$/,
      ).test(text);

      if (validNumber) {
        if (from.current_price === to.current_price) {
          setConverter(_ => ({
            to: text,
            from: text,
          }));
          return;
        }

        if (text.length > 16) {
          return;
        }

        const inputValue = Number(text);
        const result = (to.current_price * inputValue) / from.current_price;

        if (!isNaN(inputValue) && !isNaN(result)) {
          const from = String(parseFloat(result.toFixed(3)));

          setConverter(_ => ({
            from,
            to: text,
          }));
        }
      }

      if (!text.length) {
        setConverter(_ => ({ from: '0', to: text }));
      }
    },
    [from.current_price, to.current_price],
  );
  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await api.get<ICrypto[]>('coins/markets', {
          params: {
            vs_currency: currency,
            per_page: 150,
          },
        });
        const { data } = response;
        setCryptosList(data);
        setFrom(data[0]);
        setTo(data[1]);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency]);

  return (
    <Container>
      <Header />
      {error ? (
        <ErrorView title="Houve um erro!" message="Erro ao buscar os dados" />
      ) : (
        <Converter>
          <h1>Conversor</h1>
          {loading ? (
            <ConverterLoader />
          ) : (
            <>
              <InputContainer $label="De" onClick={handleFocusFrom}>
                <Input
                  ref={fromInputRef}
                  type="text"
                  value={converter.from}
                  disabled
                  onChange={handleNormalConversion}
                />
                <SelectedCrypto>
                  <img alt={`Selected coin ${from.name}`} src={from.image} />
                  <p>{from.symbol?.toUpperCase()}</p>
                  <FiChevronDown size={20} />
                </SelectedCrypto>
              </InputContainer>

              <InputContainer $label="Para" onClick={handleFocusTo}>
                <Input
                  ref={toInputRef}
                  type="text"
                  value={converter.to}
                  disabled
                  onChange={handleReverseConversion}
                />
                <SelectedCrypto>
                  <img alt={`Selected coin ${to.name}`} src={to.image} />
                  <p>{to.symbol?.toUpperCase()}</p>
                  <FiChevronDown size={20} />
                </SelectedCrypto>
              </InputContainer>
            </>
          )}

          <CoinPicker
            data={cryptosList}
            callback={handleSetFrom}
            shown={pickerShown.from}
            currency={currency}
          />
          <CoinPicker
            data={cryptosList}
            callback={handleSetTo}
            shown={pickerShown.to}
            currency={currency}
          />
        </Converter>
      )}
    </Container>
  );
};

export default Convert;
