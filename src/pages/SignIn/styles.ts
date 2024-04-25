import styled from "styled-components/native"
import { Platform } from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 160 : 40}px;
  background-color: #f5f5f5;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #4169e1;
  font-family: "robotoslab-medium";
  margin: 64px 0 24px;
`

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
  color: #5b5b5b;
  font-size: 16px;
  font-family: "robotoslab-regular";
`
export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #b4ccfc;
  border-top-width: 1px;
  border-color: #fffafa;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const CreateAccountButtonText = styled.Text`
  color: #5b5b5b;
  font-family: "robotoslab-regular";
  font-size: 18px;
  margin-left: 16px;
`
