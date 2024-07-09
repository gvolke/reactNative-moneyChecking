import React, { ReactNode } from "react"

import { AuthProvider } from "./auth"
import { MessageProvider } from "./message"
import { TransactionsProvider } from "./transaction"

interface ContextProps {
  children: ReactNode
}

const AppProvider: React.FC<ContextProps> = ({ children }) => (
  <AuthProvider>
    <MessageProvider>
      <TransactionsProvider>{children}</TransactionsProvider>
    </MessageProvider>
  </AuthProvider>
)

export default AppProvider
