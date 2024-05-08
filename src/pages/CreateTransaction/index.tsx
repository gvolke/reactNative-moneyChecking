import { useCallback, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../hooks/auth"

import { Feather } from "@expo/vector-icons"

import { Form } from "@unform/mobile"
import { FormHandles } from "@unform/core"

import Button from "../../components/Button"
import Input from "../../components/Input"
import ComboBox from "../../components/ComboBox"

import DateTimePicker from "@react-native-community/datetimepicker"
import { Alert, Platform } from "react-native"

import api from "../../services/api"

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Data,
  Calendar,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from "./styles"

const CreateTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [type, setType] = useState<string>("SAIDA")
  const [value, setValue] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [observation, setObservation] = useState<string>()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { goBack, navigate } = useNavigation<any>()
  const { user } = useAuth()

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleAddTransaction = useCallback(async () => {
    try {
      const formattedValue = Number(value)

      await api.post("transactions", {
        date: selectedDate,
        description,
        observation,
        type,
        value: formattedValue,
      })

      navigate("Dashboard")
    } catch (err) {
      Alert.alert(
        "Erro ao criar lançamento",
        "Ocorreu um erro ao criar o lançamento, tente novamente"
      )
    }
  }, [selectedDate, description, observation, type])

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === "android") {
        setShowDatePicker(false)
      }

      if (date) {
        setSelectedDate(date)
      }
    },
    []
  )

  const handleTypeChange = useCallback((transactionType: string) => {
    setType(transactionType)
  }, [])

  const handleValueChange = useCallback((transactionValue: string) => {
    setValue(transactionValue)
  }, [])

  const handleDescriptionChange = useCallback(
    (transactionDescription: string) => {
      setDescription(transactionDescription)
    },
    []
  )

  const handleObservationChange = useCallback(
    (transactionObservation: string) => {
      setObservation(transactionObservation)
    },
    []
  )

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Feather name="chevron-left" size={24} color="#4169e1" />
        </BackButton>

        <HeaderTitle>Criar Lançamento</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Form ref={formRef} onSubmit={handleAddTransaction}>
        <Data>
          <Calendar>
            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>
                Selecionar uma data
              </OpenDatePickerButtonText>
            </OpenDatePickerButton>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                onChange={handleDateChanged}
                value={selectedDate}
              />
            )}
          </Calendar>

          <ComboBox
            data={[
              { label: "SAIDA", value: "SAIDA" },
              { label: "ENTRADA", value: "ENTRADA" },
            ]}
            iconName="activity"
            selectionChange={handleTypeChange}
            value={type}
            dropDownStyle={{
              height: 60,
              backgroundColor: "#f8f8ff",
              borderWidth: 1.5,
              borderRadius: 10,
              padding: 16,
              flex: 1,
              marginRight: 8,
              marginBottom: 8,
            }}
          />

          <Input
            autoCapitalize="words"
            name="value"
            icon="dollar-sign"
            placeholder="Valor"
            onChangeText={handleValueChange}
            value={value}
            returnKeyType="next"
            keyboardType="decimal-pad"
            containerStyle={{
              flex: 1,
              alignItems: "center",
            }}
          />

          <Input
            autoCapitalize="words"
            name="description"
            icon="book-open"
            placeholder="Descrição"
            returnKeyType="next"
            onChangeText={handleDescriptionChange}
            value={description}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            containerStyle={{
              height: 80,
              alignItems: "flex-start",
              paddingTop: 12,
            }}
          />

          <Input
            autoCapitalize="words"
            name="observation"
            icon="eye"
            placeholder="Observações"
            returnKeyType="next"
            onChangeText={handleObservationChange}
            value={observation}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            containerStyle={{
              height: 130,
              alignItems: "flex-start",
              paddingTop: 12,
            }}
          />

          <Button onPress={handleAddTransaction} color="#3fd5c8" width="100%">
            +
          </Button>
        </Data>
      </Form>
    </Container>
  )
}

export default CreateTransaction
