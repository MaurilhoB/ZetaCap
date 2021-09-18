import styled from "styled-components"

export const Container = styled.div`
  height: 100vh;
`

export const MainContent = styled.div`
  background: ${props => props.theme.colors.surface};
  max-width: 94%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 40px;
  height: 94%;

  > h1 {
    font-size: 1rem;
    font-family: "Nunito";
    text-align: center;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 940px) {
    max-width: 100%;
    padding: 20px;
  }
`

export const CryptoList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 940px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 10px 2px;
  transition: transform 0.1s linear;
  cursor: pointer;

  &:hover {
    transform: scale(1.01) translateX(1px);
  }

  box-shadow: -1px 0px 0px #f2f2f2;
`

export const CryptoIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

export const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: "Nunito";
  margin: 0 10px;
`

export const Name = styled.span`
  font-weight: 700;
  color: ${props => props.theme.colors.text_primary};
`

export const Symbol = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text_secondary};
  font-size: 14px;
`

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.text_primary};
  font-family: "Nunito";
`

export const Price = styled.span`
  font-weight: 700;
  font-size: 14px;
`

export const Status = styled.span`
  font-weight: 700;
  font-size: 12px;
`
