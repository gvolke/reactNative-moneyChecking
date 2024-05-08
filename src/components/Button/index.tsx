import React from "react"
import { RectButtonProperties } from "react-native-gesture-handler"

import { Container, ButtonText } from "./styles"
import { DimensionValue } from "react-native"

interface ButtonProps extends RectButtonProperties {
  children: string
  color: string
  width?: DimensionValue
}

const Button: React.FC<ButtonProps> = ({ children, color, width, ...rest }) => {
  return (
    <Container
      style={{
        borderRadius: 10,
        backgroundColor: color,
        width,
      }}
      {...rest}
    >
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

export default Button
