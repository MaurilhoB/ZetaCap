import styled from 'styled-components';
import { animated } from '@react-spring/web';

interface IStatusProps {
  statusColor?: string;
}

export const Container = styled(animated.div)`
  background: ${props => props.theme.colors.surface};
  color: #fff;
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  z-index: 999;

  display: flex;
  flex-direction: column;

  & > div:first-child {
    position: sticky;
    top: 0px;
    z-index: 9999;
    padding: 0 20px;

    border-top: 40px solid transparent;
    background: ${props => props.theme.colors.surface};
  }
`;

export const CryptoList = styled.div`
  display: grid;
  padding: 0 20px;

  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 940px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 10px 2px;
  transition: transform 0.1s linear;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    background: #2c8af622;
  }
`;

export const CryptoIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: 'Nunito';
  margin: 0 10px;
`;

export const Name = styled.span`
  font-weight: 700;
  color: ${props => props.theme.colors.text_primary};
`;

export const Symbol = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text_secondary};
  font-size: 14px;
`;

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.text_primary};
  font-family: 'Nunito';
  text-align: right;
`;

export const Price = styled.span`
  font-weight: 700;
  font-size: 14px;
`;

export const Status = styled.span<IStatusProps>`
  font-weight: 700;
  font-size: 12px;
  color: ${props =>
    props.statusColor ? props.statusColor : props.theme.colors.text_primary};
`;
