import React, { InputHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container, Input } from './styles';

interface ISerchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  focused?: boolean;
}

const SearchBar: React.FC<ISerchBarProps> = ({ focused, ...rest }) => {
  return (
    <Container>
      <FiSearch size={20} />
      <Input {...rest} />
    </Container>
  );
};

export default SearchBar;
