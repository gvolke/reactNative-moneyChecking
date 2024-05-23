import React, {
  createContext,
  useCallback,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react"
import { decode as atob } from "base-64"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCedentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  loading: boolean
  signIn(credentials: SignInCedentials): Promise<void>
  signOut(): void
  updateUser(user: User): Promise<void>
}

interface Props {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoredData(): Promise<void> {
      const tokenTemp = await AsyncStorage.getItem("@MoneyChecking:token")

      if (tokenTemp) {
        try {
          const tokenData = JSON.parse(atob(tokenTemp.split(".")[1]))
          const tokenExpiry = tokenData.exp * 1000
          const currentTime = Date.now()

          if (currentTime > tokenExpiry) {
            await AsyncStorage.multiRemove([
              "@MoneyChecking:token",
              "@MoneyChecking:user",
            ])
          }
        } catch (error) {
          console.error("Erro ao decodificar ou manipular o token:", error)
        }
      }

      const [token, user] = await AsyncStorage.multiGet([
        "@MoneyChecking:token",
        "@MoneyChecking:user",
      ])

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`

        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

      setLoading(false)
    }

    loadStoredData()
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCedentials) => {
    const response = await api.post("sessions", {
      email,
      password,
    })

    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ["@MoneyChecking:token", token],
      ["@MoneyChecking:user", JSON.stringify(user)],
    ])

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      "@MoneyChecking:token",
      "@MoneyChecking:user",
    ])

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem("@MoneyChecking:user", JSON.stringify(user))

      setData({
        token: data.token,
        user,
      })
    },
    [setData, data.token]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}
