import React, { useCallback, useEffect, useState } from "react"
import { format, parseISO } from "date-fns"

import api from "../../services/api"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../hooks/auth"

import { Feather } from "@expo/vector-icons"

import Button from "../../components/Button"
import ComboBox from "../../components/ComboBox"
import YearInput from "../../components/YearInput"

const months = [
  { label: "Janeiro", value: "1" },
  { label: "Fevereiro", value: "2" },
  { label: "Março", value: "3" },
  { label: "Abril", value: "4" },
  { label: "Maio", value: "5" },
  { label: "Junho", value: "6" },
  { label: "Julho", value: "7" },
  { label: "Agosto", value: "8" },
  { label: "Setembro", value: "9" },
  { label: "Outubro", value: "10" },
  { label: "Novembro", value: "11" },
  { label: "Dezembro", value: "12" },
]

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  FieldsContainer,
  ButtonSearch,
  TransactionsList,
  TransactionContainer,
  TransactionInfo,
  TransactionDescription,
  TransactionHeader,
  TransactionBalance,
  TransactionDate,
  TransactionType,
  TransactionValue,
  ButtonContainer,
} from "./styles"

export interface Transaction {
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

const Dashboard: React.FC = () => {
  const date = new Date()

  const [selectedMonth, setSelectedMonth] = useState<number>(
    date.getMonth() + 1
  )
  const [year, setYear] = useState<string>(date.getFullYear().toString())
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const { user } = useAuth()
  const { navigate } = useNavigation<any>()

  useEffect(() => {
    handleSearch()
  }, [transactions])

  const handleMonthChange = useCallback((value: number) => {
    setSelectedMonth(value)
  }, [])

  const handleYearChange = useCallback((value: string) => {
    const numeroFormatado = value.replace(/[^0-9]/g, "")
    setYear(numeroFormatado)
  }, [])

  const handleSearch = useCallback(async () => {
    const response = await api.get("/usertransactions/month", {
      params: {
        month: selectedMonth,
        year: year,
      },
    })

    setTransactions(response.data)
  }, [selectedMonth, year])

  const navigateToProfile = useCallback(() => {
    navigate("Profile")
  }, [navigate])

  const navigateToCreateTransaction = useCallback(() => {
    navigate("CreateTransaction")
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem Vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <FieldsContainer>
        <ComboBox
          data={months}
          iconName="calendar"
          selectionChange={handleMonthChange}
          value={selectedMonth.toString()}
          dropDownStyle={{
            height: 60,
            backgroundColor: "#f8f8ff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 16,
            marginRight: 8,
            flex: 4,
          }}
        />

        <YearInput
          name="Ano"
          icon="clock"
          placeholder="Ano"
          onChangeText={handleYearChange}
          isFilled={!!year}
          value={year}
          containerStyle={{
            height: 60,
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 16,
            marginRight: 8,
            flex: 2,
          }}
        />

        <ButtonSearch onPress={handleSearch}>
          <Feather name="search" size={25} color="white" />
        </ButtonSearch>
      </FieldsContainer>

      <TransactionsList
        data={transactions}
        renderItem={({ item: data }) => (
          <TransactionContainer>
            <TransactionHeader>
              <TransactionDate>
                {format(
                  parseISO(data.transaction.date.toString()),
                  "dd/MM/yyyy"
                ).toString()}
              </TransactionDate>
              <TransactionType
                isNegative={data.transaction.type === "SAIDA" ? true : false}
              >
                {data.transaction.type}
              </TransactionType>
            </TransactionHeader>

            <TransactionInfo>
              <TransactionDescription>
                {data.transaction.description}
              </TransactionDescription>

              <TransactionValue>
                R$ {data.transaction.value.toString()}
              </TransactionValue>
              <TransactionBalance>
                R$ {data.balance.toFixed(2).toString()}
              </TransactionBalance>
            </TransactionInfo>
          </TransactionContainer>
        )}
      />

      <ButtonContainer>
        <Button onPress={navigateToCreateTransaction} color="#3fd5c8">
          +
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default Dashboard
