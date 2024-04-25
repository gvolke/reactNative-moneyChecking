import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

export const Container = styled(RectButton)`
  height: 60px;
  background: #4169e1;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-family: "robotoslab-medium";
  color: #ffffff;
  font-size: 18px;
`
