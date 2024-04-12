import styled from "styled-components/native"
import { RectButton } from "react-native-gesture-handler"

export const Container = styled(RectButton)`
  height: 60px;
  background: #f7db55;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`

export const ButtonText = styled.Text`
  font-family: "robotoslab-medium";
  color: #5b5b5b;
  font-size: 18px;
`
