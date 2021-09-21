import styled from 'styled-components';

interface IInputContainerProps {
  label?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
`;

export const Converter = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${props => props.theme.colors.surface};
  margin: 0 auto;
  width: 98%;
  border-radius: 10px;
  padding: 4%;

  box-shadow: 1px 1px 0px ${props => props.theme.colors.border};

  > h1 {
    color: ${props => props.theme.colors.text_primary};
    text-align: center;
    margin-bottom: 25px;
    font-size: 1rem;
    font-family: 'Nunito';
  }
`;

export const InputContainer = styled.div<IInputContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.border};
  
  > svg {
    margin-right: 10px;
    font-weight: 600;
    color: ${props => props.theme.colors.text_primary};
  }

  
  &::before {
    content: '${props => props.label}';
    display: inline-block;
    position: absolute;
    top: calc(-1.2rem / 1.6);
    padding: 0 4px;
    left: 20px;
    background: ${props => props.theme.colors.surface};

    font-family: 'Nunito';
    font-size: 1.2rem;
    color: ${props => props.theme.colors.text_primary};
  }

  & + div {
    margin-top: 20px;
  }

`;

export const Input = styled.input`
  width: 100%;
  padding: 20px;
  border: 0;
  border-radius: 10px;
  outline: none;

  background: ${props => props.theme.colors.surface};
  font-family: 'Nunito';
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text_primary};

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SelectedCrypto = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  p {
    font-family: 'Nunito';
    color: ${props => props.theme.colors.text_primary};
    font-weight: 700;
    margin-left: 8px;
  }
`;
