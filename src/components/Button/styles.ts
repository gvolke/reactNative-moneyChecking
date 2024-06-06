import styled, { css } from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

interface ContainerProps {
  enabled: boolean
}

export const Container = styled(RectButton)<ContainerProps>`
  height: 60px;
  background: #4169e1;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
  opacity: 1;

  ${(props) =>
    props.enabled === false &&
    css`
      opacity: 0.6;
    `}
`

export const ButtonText = styled.Text`
  font-family: "robotoslab-medium";
  color: #ffffff;
  font-size: 18px;
`
