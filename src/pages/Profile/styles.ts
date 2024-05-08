import styled from "styled-components/native"
import { Platform } from "react-native"

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 160 : 40}px;
  position: relative;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #4169e1;
  font-family: "robotoslab-medium";
  margin: 24px 0;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  border-width: 4px;
  border-color: #4169e1;
  align-self: center;
`

export const BackButton = styled.TouchableOpacity``

export const LogOutButton = styled.TouchableOpacity``

export const ButtonContainer = styled.View`
  margin-top: 150px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
