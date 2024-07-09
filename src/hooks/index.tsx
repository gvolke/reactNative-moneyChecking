import React, { ReactNode } from "react"

import { AuthProvider } from "./auth"
import { MessageProvider } from "./message"

interface ContextProps {
  children: ReactNode
}

const AppProvider: React.FC<ContextProps> = ({ children }) => (
  <AuthProvider>
    <MessageProvider>{children}</MessageProvider>
  </AuthProvider>
)

export default AppProvider
