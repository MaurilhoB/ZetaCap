import styled, { css, keyframes } from 'styled-components';

interface IMenuItemProps {
  focused?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: ${props => props.theme.colors.surface};
  padding: 20px;
  margin-bottom: 15px;

  @media screen and (max-width: 500px) {
    padding: 5px;
  }
`;

export const LeftContainer = styled.div`
  > ul {
    display: flex;
    align-items: center;
  }
`;

export const MenuItem = styled.li<IMenuItemProps>`
  list-style: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    font-family: 'Nunito';
    font-family: 18px;
    font-weight: 700;
    user-select: none;
    color: ${({ theme }) =>
      theme.title === 'light'
        ? theme.colors.text_secondary
        : theme.colors.text_primary};

    > svg {
      margin-right: 8px;
    }
  }

  &:hover::after {
    opacity: 1;
    transform: scaleX(1);
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: -2px;
    height: 2px;
    border-radius: 10px;
    width: 90%;
    opacity: 0;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    background: ${props => props.theme.colors.primary};
  }

  ${props =>
    props.focused &&
    css`
      &::after {
        opacity: 1;
        transform: scaleX(1);
      }
    `}

  & + li {
    margin-left: 10px;
  }
`;

export const RightContainer = styled.div`
  > ul {
    display: flex;
    align-items: center;
  }

  ul > li {
    list-style: none;
    display: flex;
    align-items: center;

    > button {
      margin-right: 8px;
      background: transparent;
      padding: 8px;
      border: 0;
      cursor: pointer;

      > svg {
        font-size: 1.2rem;
      }
    }

    font-family: 'Nunito';
    font-family: 18px;
    font-weight: 700;
    color: ${props => props.theme.colors.text_secondary};
  }
`;

const dropdown = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`;

export const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-right: 8px;
  cursor: pointer;

  > ul {
    display: none;
  }

  &:hover > ul {
    display: block;
    animation: ${dropdown} 0.2s linear;
  }

  > ul {
    position: absolute;
    padding: 20px;
    border-radius: 10px;
    background: ${props => props.theme.colors.surface};
    box-shadow: 0px 1px 0px ${props => props.theme.colors.border};
    top: 100%;
  }
`;
