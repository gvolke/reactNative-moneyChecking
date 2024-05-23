import { FlatList, FlatListProps } from "react-native"
import styled, { css } from "styled-components/native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { Transaction } from "."

interface balanceProps {
  isNegative: boolean
}

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

export const HeaderTitle = styled.Text`
  color: #5b5b5b;
  font-family: "robotoslab-regular";
  line-height: 28px;
`

export const UserName = styled.Text`
  color: #4169e1;
  font-family: "robotoslab-medium";
`
export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border-width: 1.5px;
  border-color: #4169e1;
`

export const FieldsContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 8px;
`

export const ButtonSearch = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: #3fd5c8;
  border-radius: 15px;

  border: solid 1px #ccdbfc;

  flex: 1.3;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const TransactionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 0px 8px 8px 8px;
  padding: 10px;
  border: 1.5px solid #4169e1;
  border-radius: 15px;

  background: #f8f8ff;
`

export const TransactionInfo = styled.View`
  display: flex;
  flex-direction: column;

  flex: 1;
`

export const TransactionHeader = styled.View`
  display: flex;
  flex-direction: column;
  margin-right: 18px;
`

export const TransactionDate = styled.Text`
  font-size: 16px;
  font-family: "robotoslab-medium";
  color: #4169e1;
`

export const TransactionType = styled.Text<balanceProps>`
  font-size: 16px;
  font-family: "robotoslab-medium";
  color: green;

  ${(props) =>
    props.isNegative &&
    css`
      color: #dc143c;
    `}
`

export const TransactionDescription = styled.Text`
  font-size: 16px;
  font-family: "robotoslab-medium";

  flex: 1;
`

export const TransactionValue = styled.Text`
  font-size: 16px;
  font-family: "robotoslab-regular";
`

export const TransactionBalance = styled.Text`
  font-size: 16px;
  font-family: "robotoslab-medium";
`

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<Transaction>) => FlatList<Transaction>
)``

export const ButtonContainer = styled.View`
  margin: 8px;
`
