import styled from "styled-components/native"
import { Platform } from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 160 : 40}px;
  position: relative;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: "robotoslab-medium";
  margin: 24px 0;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 150px;
`
