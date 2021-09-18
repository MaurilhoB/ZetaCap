import styled from "styled-components"

export const Container = styled.div`
  display: flex;
`

export const Input = styled.input`
  outline: none;
  border: 0;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  font-family: "Nunito";
  background: ${props => props.theme.colors.background_primary};
`
