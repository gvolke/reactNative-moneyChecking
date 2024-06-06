import React from "react"
import { RectButtonProperties } from "react-native-gesture-handler"

import { Container, ButtonText } from "./styles"
import { DimensionValue } from "react-native"

interface ButtonProps extends RectButtonProperties {
  children: string
  color: string
  width?: DimensionValue
  enabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  enabled = true,
  width,
  ...rest
}) => {
  return (
    <Container
      style={{
        borderRadius: 10,
        backgroundColor: color,
        width,
      }}
      enabled={enabled}
      {...rest}
    >
      <ButtonText>{children}</ButtonText>
    </Container>
  )
}

export default Button
