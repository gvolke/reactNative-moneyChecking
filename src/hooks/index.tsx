import React, { ReactNode } from "react"

import { AuthProvider } from "./auth"

interface ContextProps {
  children: ReactNode
}

const AppProvider: React.FC<ContextProps> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

export default AppProvider
