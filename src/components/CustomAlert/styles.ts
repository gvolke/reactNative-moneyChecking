import styled, { css } from "styled-components/native"

interface ContainerProps {
  type?: "success" | "error" | "info"
}

const colors = {
  info: "#0000cd",
  error: "#dc143c",
  success: "#228b22",
}

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`

export const ModalContainer = styled.View<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;

  border: 3px solid;

  ${(props) =>
    props.type &&
    css`
      border-color: ${colors[props.type] || "info"};
    `}
`

export const AlertTitle = styled.Text<ContainerProps>`
  margin: 10px;

  ${(props) =>
    props.type &&
    css`
      color: ${colors[props.type] || "info"};
    `}

  font-weight: bold;
  font-size: 18px;
  text-align: center;
`

export const AlertMessage = styled.Text`
  margin-bottom: 20px;
  font-size: 18px;
  text-align: left;
`

export const AlertButton = styled.TouchableOpacity<ContainerProps>`
  ${(props) =>
    props.type &&
    css`
      background-color: ${colors[props.type] || "info"};
    `}
  border-radius: 100px;
  padding: 10px;
  width: 50%;
`

export const AlertButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`
