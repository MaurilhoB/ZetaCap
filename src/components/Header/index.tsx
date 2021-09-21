import React from 'react';
import { FiTrendingUp, FiRefreshCw, FiMoon, FiSun } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../providers/theme';

import { Container, LeftContainer, MenuItem, RightContainer } from './styles';

const Header: React.FC = () => {
  const { toggleTheme, currentTheme } = useTheme();
  const { pathname } = useLocation();

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

export default Header;
