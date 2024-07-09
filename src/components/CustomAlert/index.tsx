import React, { useEffect } from "react"
import { Modal } from "react-native"
import { Feather } from "@expo/vector-icons"

import {
  ModalBackground,
  ModalContainer,
  AlertTitle,
  AlertMessage,
  AlertButton,
  AlertButtonText,
} from "./styles"

import { useMessage } from "../../hooks/message"

interface AlertProps {
  description: string
  title: string
  type: "success" | "error" | "info"
  isVisible: boolean
}

const icons = {
  info: "info",
  error: "alert-triangle",
  success: "thumbs-up",
}

const colors = {
  info: "#0000cd",
  error: "#dc143c",
  success: "#228b22",
}

const CustomAlert: React.FC<AlertProps> = ({
  description,
  title,
  type,
  isVisible,
}) => {
  const { removeMessage } = useMessage()

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={removeMessage}
    >
      <ModalBackground>
        <ModalContainer type={type}>
          <Feather
            name={icons[type || "info"]}
            size={50}
            color={colors[type || "info"]}
          />
          <AlertTitle type={type}>{title}</AlertTitle>
          <AlertMessage>{description}</AlertMessage>
          <AlertButton type={type} onPress={removeMessage}>
            <AlertButtonText>OK</AlertButtonText>
          </AlertButton>
        </ModalContainer>
      </ModalBackground>
    </Modal>
  )
}

export default CustomAlert
