import styled, { css } from "styled-components/native"
import { Feather } from "@expo/vector-icons"

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: #f8f8ff;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 2px solid #4169e1;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #3fd5c8;
    `}
`

export const Text = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #5b5b5b;
  font-size: 16px;
  font-family: "robotoslab-regular";
`
export const Icon = styled(Feather)`
  margin-right: 16px;
`
