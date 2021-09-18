import React, { InputHTMLAttributes } from "react"

import { Container, Input } from "./styles"

interface ISerchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  focused?: boolean
}

const SearchBar: React.FC<ISerchBarProps> = ({ focused, ...rest }) => {
  return (
    <Container>
      <Input {...rest} />
    </Container>
  )
}

export default SearchBar
