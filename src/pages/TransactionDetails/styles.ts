import styled from "styled-components/native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #efefef;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom-width: 1.5px;
  border: solid #4169e1;
`

export const BackButton = styled.TouchableOpacity``

export const DeleteButton = styled.TouchableOpacity``

export const EditButton = styled.TouchableOpacity`
  margin-left: 265px;
`

export const HeaderTitle = styled.Text`
  color: #4169e1;
  font-family: "robotoslab-medium";
  font-size: 20px;
  margin-left: 16px;
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;

  border-width: 1.5px;
  border-color: #4169e1;
`

export const Data = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin: 8px;
`

export const Calendar = styled.View`
  width: 100%;
  margin-bottom: 8px;
`

export const CalendarHeader = styled.Text`
  display: flex;
  align-self: center;
  padding: 8px;

  font-size: 24px;
  font-family: "robotoslab-medium";
  color: #3fd5c8;
`
