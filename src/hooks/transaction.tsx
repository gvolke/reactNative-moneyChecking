import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
} from "react"

import api from "../services/api"

interface Transaction {
  transaction: {
    id: string
    type: string
    description: string
    observation: string
    user_id: string
    date: Date
    value: number
  }
  balance: number
}

interface fetchTransactionData {
  month: number
  year: string
}

interface createTransactionData {
  date: Date
  description: string
  observation: string
  type: string
  value: number
}

interface TransactionsContextData {
  transactions: Transaction[]
  month: number
  year: string
  fetchTransactions({ month, year }: fetchTransactionData): Promise<void>
  createTransaction(
    data: createTransactionData,
    month: number,
    year: string
  ): Promise<Transaction>
}

interface Props {
  children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider: React.FC<Props> = ({ children }) => {
  const date = new Date()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [month, setMonth] = useState<number>(date.getMonth() + 1)
  const [year, setYear] = useState<string>(date.getFullYear().toString())

  const fetchTransactions = useCallback(
    async ({ month, year }: fetchTransactionData) => {
      const response = await api.get("/usertransactions/month", {
        params: {
          month,
          year,
        },
      })

      setTransactions(response.data)
    },
    []
  )

  const createTransaction = useCallback(
    async (data: createTransactionData, month: number, year: string) => {
      const response = await api.post("transactions", data)
      const transaction = await response.data

      fetchTransactions({
        month,
        year,
      })

      setMonth(month)
      setYear(year)

      return transaction
    },
    []
  )

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        month,
        year,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction(): TransactionsContextData {
  const context = useContext(TransactionsContext)

  return context
}
