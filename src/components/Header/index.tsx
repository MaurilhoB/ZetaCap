import React, { useCallback } from 'react';
import { FiTrendingUp, FiRefreshCw, FiMoon, FiSun } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import usePreferences from '../../hooks/usePreferences';
import { useTheme } from '../../providers/theme';

import {
  Container,
  CurrencyToggle,
  LeftContainer,
  MenuItem,
  RightContainer,
} from './styles';

const Header: React.FC = () => {
  const { toggleTheme, currentTheme } = useTheme();
  const { pathname } = useLocation();
  const { currency, setPreferences } = usePreferences();

  const handleChangeCurrency = useCallback(
    (currency: 'USD' | 'BRL') => {
      setPreferences(prev => ({
        ...prev,
        currency,
      }));
    },
    [setPreferences],
  );

  return (
    <Container>
      <LeftContainer>
        <ul>
          <MenuItem focused={pathname === '/'}>
            <Link to="/">
              <FiTrendingUp />
              Mercados
            </Link>
          </MenuItem>
          <MenuItem focused={pathname === '/convert'}>
            <Link to="/convert">
              <FiRefreshCw />
              Conversor
            </Link>
          </MenuItem>
        </ul>
      </LeftContainer>

      <RightContainer>
        <ul>
          <li>
            <CurrencyToggle>
              <p>Moeda: {currency}</p>
              <ul>
                <li onClick={() => handleChangeCurrency('USD')}>USD</li>
                <li onClick={() => handleChangeCurrency('BRL')}>BRL</li>
              </ul>
            </CurrencyToggle>
          </li>
          <li>
            <button onClick={toggleTheme}>
              {currentTheme.title === 'light' ? (
                <FiMoon size={20} color={currentTheme.colors.text_primary} />
              ) : (
                <FiSun size={20} color={currentTheme.colors.text_primary} />
              )}
            </button>
          </li>
        </ul>
      </RightContainer>
    </Container>
  );
};

export default React.memo(Header);
