import React, { useCallback, forwardRef, useState } from "react"
import { TextInputProps, TextInput } from "react-native"

import { Container, Text, Icon } from "./styles"

interface InputProps extends TextInputProps {
  name: string
  icon: string
  isFilled: boolean
  containerStyle?: {}
}

interface InputRef {
  focus(): void
}

const YearInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, isFilled, containerStyle = {}, ...rest },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Container style={containerStyle} isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? "#3fd5c8" : "#4169e1"}
      />
      <Text
        placeholderTextColor="#5b5b5b"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => "value"}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(YearInput)
