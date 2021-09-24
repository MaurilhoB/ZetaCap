import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-size: 14px;
    font-family: sans-serif;
    background: ${props => props.theme.colors.background_primary}
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface}; 
  }
 
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary}; 
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primary}; 
  }
`;
