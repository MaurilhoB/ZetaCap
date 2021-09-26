import styled from 'styled-components';

interface IBadgeProps {
  color?: string;
  bgcolor?: string;
}

interface IChartButton {
  focused?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 10px;
  width: 98%;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 40px;
  display: flex;
  flex: 1;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    & {
      padding: 30px 15px;
    }
  }
`;

export const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const CryptoImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media screen and (max-width: 600px) {
    & {
      width: 40px;
      height: 40px;
    }
  }
`;

export const CryptoMeta = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Name = styled.h1`
  font-size: 2rem;
  font-family: 'Nunito';
  color: ${props => props.theme.colors.text_primary};
  font-weight: 700;

  @media screen and (max-width: 600px) {
    & {
      font-size: 1rem;
    }
  }
`;

export const Symbol = styled.h2`
  font-size: 1rem;
  font-family: 'Nunito';
  color: ${props => props.theme.colors.text_secondary};
  font-weight: 700;

  @media screen and (max-width: 600px) {
    & {
      font-size: 0.8rem;
    }
  }
`;

export const CryptoPriceInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  > h4 {
    font-size: 1.2rem;
    font-family: 'Nunito';
    color: ${props => props.theme.colors.text_primary};
    font-weight: 700;
    white-space: nowrap;

    @media screen and (max-width: 600px) {
      & {
        font-size: 0.8rem;
      }
    }
  }
`;

export const Badge = styled.span<IBadgeProps>`
  padding: 5px;
  color: ${props => props.color || props.theme.colors.text_primary};
  border-radius: 5px;
  background: ${props =>
    props.bgcolor || props.theme.colors.background_primary};
  font-size: 0.8rem;
  font-weight: 700;
  font-family: 'Nunito';
  display: inline-flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    & {
      font-size: 0.6rem;
      padding: 2px;
    }
  }
`;

export const MarketInfo = styled.div`
  margin-top: 20px;

  & > div {
    > h4 {
      margin-bottom: 4px;
      font-size: 0.8rem;
      font-weight: 700;
      font-family: 'Nunito';
      color: ${props => props.theme.colors.text_primary};
    }
    > span {
      font-size: 0.7rem;
      font-weight: 700;
      font-family: 'Nunito';
      & + span {
        margin-left: 5px;
      }
    }
  }
`;

export const Advanced = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }

  margin-top: 30px;

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    font-family: 'Nunito';
    color: ${props => props.theme.colors.text_secondary};
  }

  span {
    font-size: 0.8rem;
    font-weight: 700;
    font-family: 'Nunito';
    color: ${props => props.theme.colors.text_primary};
  }
`;

export const ChartContainer = styled.div`
  > h1 {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: 'Nunito';
    color: ${props => props.theme.colors.text_primary};
    margin-bottom: 10px;
  }

  > h1 + div {
    margin-bottom: 15px;

    h6 {
      font-size: 1rem;
      font-weight: 600;
      font-family: 'Nunito';
      color: ${props => props.theme.colors.text_primary};
      display: inline;
      margin-right: 20px;
    }
  }

  width: 100%;
  height: 500px;
  padding: 20px 0 80px;
`;

export const ChartButton = styled.button<IChartButton>`
  display: inline-flex;
  align-items: center;
  margin: 0 2px;
  padding: 5px;

  border: 2px solid
    ${props => (props.focused ? props.theme.colors.primary : 'transparent')};
  border-radius: 5px;

  background: ${props => props.theme.colors.background_primary};
  color: ${props => props.color || props.theme.colors.text_primary};

  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Nunito';

  cursor: pointer;
`;
