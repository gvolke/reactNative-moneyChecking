import React, {
  useCallback,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"
import { TextInputProps, TextInput } from "react-native"

import { Container, Text, Icon } from "./styles"

interface InputProps extends TextInputProps {
  ref?: React.RefObject<TextInput>
  editable?: boolean
  name: string
  icon: string
  value: any
  containerStyle?: {}
}

interface InputRef {
  focus(): void
  blur(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, value, editable = true, containerStyle = {}, ...rest },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputElementRef = useRef<any>(null)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    inputElementRef.current?.blur()

    setIsFocused(false)
  }, [])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus()
    },
    blur() {
      inputElementRef.current?.blur()
    },
  }))

  return (
    <Container style={containerStyle} isFocused={isFocused} editable={editable}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || !!value ? "#3fd5c8" : "#4169e1"}
      />
      <Text
        ref={inputElementRef}
        placeholderTextColor="#5b5b5b"
        value={value}
        editable={editable}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
