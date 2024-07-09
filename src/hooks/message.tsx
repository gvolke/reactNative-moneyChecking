import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useState,
} from "react"

import CustomAlert from "../components/CustomAlert"

interface messageType {
  description: string
  title: string
  type: "success" | "error" | "info"
}

interface messageContextData {
  addMessage(message: messageType): void
  removeMessage(): void
}

interface ContextProps {
  children: ReactNode
}

const messageContext = createContext<messageContextData>(
  {} as messageContextData
)

const MessageProvider: React.FC<ContextProps> = ({ children }) => {
  const [messages, setMessages] = useState<messageType>({} as messageType)
  const [visible, setVisible] = useState(false)

  const addMessage = useCallback(
    ({ type, title, description }: messageType) => {
      const message = {
        type,
        title,
        description,
      }

      setMessages(message)
      setVisible(true)
    },
    []
  )

  const removeMessage = useCallback(() => {
    setVisible(false)
  }, [])

  return (
    <messageContext.Provider value={{ addMessage, removeMessage }}>
      {children}
      <CustomAlert
        description={messages.description}
        type={messages.type}
        title={messages.title}
        isVisible={visible}
      />
    </messageContext.Provider>
  )
}

function useMessage(): messageContextData {
  const context = useContext(messageContext)

  if (!context) {
    throw new Error("useMessage must be used within a messageProvider")
  }

  return context
}

export { MessageProvider, useMessage }
