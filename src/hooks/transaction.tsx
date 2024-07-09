import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useContext,
} from "react"

import api from "../services/api"

interface Transaction {
  id: string
  type: string
  description: string
  observation: string
  user_id?: string
  date: Date
  value: number
  category: string
}

interface TransactionBalance {
  transaction: Transaction
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
  transactions: TransactionBalance[]
  month: number
  year: string
  fetchTransactions({ month, year }: fetchTransactionData): Promise<void>
  createTransaction(data: createTransactionData): Promise<TransactionBalance>
  showTransaction(transactionId: string): Promise<Transaction>
  updateTransaction(transaction: Transaction): Promise<Transaction>
  deleteTransaction(
    transactionId: string,
    month: number,
    year: string
  ): Promise<void>
}

interface Props {
  children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider: React.FC<Props> = ({ children }) => {
  const date = new Date()

  const [transactions, setTransactions] = useState<TransactionBalance[]>([])
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

  const createTransaction = useCallback(async (data: createTransactionData) => {
    const response = await api.post("transactions", data)
    const transaction = await response.data

    const { date } = response.data
    const dateFormatted: Date = new Date(date)

    setMonth(dateFormatted.getMonth() + 1)
    setYear(dateFormatted.getFullYear().toString())

    fetchTransactions({
      month: dateFormatted.getMonth() + 1,
      year: dateFormatted.getFullYear().toString(),
    })

    return transaction
  }, [])

  const showTransaction = useCallback(
    async (transactionId: string): Promise<Transaction> => {
      const response = await api.get(`/transactions/${transactionId}`)

      return response.data
    },
    []
  )

  const updateTransaction = useCallback(
    async (transaction: Transaction): Promise<Transaction> => {
      const response = await api.put("/transactions/", transaction)
      const updatedTransaction = response.data

      const { date } = response.data
      const dateFormatted: Date = new Date(date)

      setMonth(dateFormatted.getMonth() + 1)
      setYear(dateFormatted.getFullYear().toString())

      fetchTransactions({
        month: dateFormatted.getMonth() + 1,
        year: dateFormatted.getFullYear().toString(),
      })

      return updatedTransaction
    },
    []
  )

  const deleteTransaction = useCallback(
    async (
      transactionId: string,
      month: number,
      year: string
    ): Promise<void> => {
      await api.delete(`/transactions/${transactionId}`)

      setMonth(month)
      setYear(year)

      fetchTransactions({
        month,
        year,
      })

      return
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
        showTransaction,
        updateTransaction,
        deleteTransaction,
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
