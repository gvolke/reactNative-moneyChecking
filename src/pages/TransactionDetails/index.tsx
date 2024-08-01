import { useCallback, useState, useRef, useEffect } from "react"
import { useRoute, RouteProp } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { useTransaction } from "../../hooks/transaction"

import { Feather } from "@expo/vector-icons"
import { TextInput } from "react-native"
import { format } from "date-fns"

import * as Yup from "yup"

import Button from "../../components/Button"
import Input from "../../components/Input"
import ComboBox from "../../components/ComboBox"

import DateTimePicker from "@react-native-community/datetimepicker"
import { Platform } from "react-native"

import { useMessage } from "../../hooks/message"

import {
  Container,
  Header,
  BackButton,
  DeleteButton,
  EditButton,
  Data,
  Calendar,
  CalendarHeader,
} from "./styles"

type RootStackParamList = {
  TransactionDetails: { id: string }
}

type TransactionDetailsRouteProp = RouteProp<
  RootStackParamList,
  "TransactionDetails"
>

const TransactionDetails: React.FC = () => {
  const { addMessage } = useMessage()

  const categories = [
    { label: "LAZER", value: "LAZER" },
    { label: "MERCADO", value: "MERCADO" },
    { label: "RESTAURANTES", value: "RESTAURANTES" },
    { label: "TRANSPORTE", value: "TRANSPORTE" },
    { label: "VESTUÁRIO", value: "VESTUÁRIO" },
    { label: "MORADIA", value: "MORADIA" },
    { label: "SAÚDE", value: "SAÚDE" },
    { label: "EDUCAÇÃO", value: "EDUCAÇÃO" },
    { label: "SERVIÇOS", value: "SERVIÇOS" },
    { label: "INVESTIMENTOS", value: "INVESTIMENTOS" },
    { label: "RECEBIMENTOS", value: "RECEBIMENTOS" },
  ]

  const route = useRoute<TransactionDetailsRouteProp>()
  const { id } = route.params

  const valueInputRef = useRef<TextInput>(null)
  const descriptionInputRef = useRef<TextInput>(null)
  const observationInputRef = useRef<TextInput>(null)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [type, setType] = useState<string>("SAIDA")
  const [value, setValue] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [observation, setObservation] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  const [showDatePicker, setShowDatePicker] = useState(false)

  const [editable, setIsEditable] = useState<boolean>(false)

  const { goBack, navigate } = useNavigation<any>()
  const { showTransaction, updateTransaction, deleteTransaction } =
    useTransaction()

  useEffect(() => {
    const loadTransactionData = async () => {
      const transaction = await showTransaction(id)

      setSelectedDate(new Date(transaction.date))
      setType(transaction.type)
      setValue(transaction.value.toString())

      setDescription(transaction.description)
      setObservation(transaction.observation)
      setCategory(transaction.category)
    }

    loadTransactionData()
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleUpdateTransaction = useCallback(async () => {
    try {
      let formattedValue = Number(value)

      if (isNaN(formattedValue)) {
        formattedValue = 0
      }

      const nowDate = new Date()

      const formattedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        nowDate.getHours(),
        nowDate.getMinutes(),
        nowDate.getSeconds()
      )

      const data = {
        id,
        date: formattedDate,
        description,
        observation,
        type,
        value: formattedValue,
        category,
      }

      const schema = Yup.object().shape({
        date: Yup.date().required("A data é obrigatória."),
        description: Yup.string().required("A descrição é obrigatória."),
        observation: Yup.string(),
        value: Yup.number().notOneOf([0, undefined], "Valor inválido."),
        category: Yup.string().required("A categoria é obrigatória."),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      await updateTransaction(data)

      addMessage({
        type: "success",
        title: "Parabéns",
        description: "Lançamento alterado com sucesso",
      })

      navigate("Dashboard")
    } catch (err) {
      let yupError: string = ""

      if (err instanceof Yup.ValidationError) {
        yupError = err.inner[0].message
      }

      addMessage({
        type: "error",
        title: "Erro ao salvar edição",
        description:
          "Ocorreu um erro ao salvar a edição do lançamento. " + yupError,
      })
    }
  }, [selectedDate, description, observation, type, value, category])

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

  const handleCategoryChange = useCallback((transactionCategory: string) => {
    setCategory(transactionCategory)
  }, [])

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

  const Editable = useCallback((value: boolean) => {
    setIsEditable(value)
  }, [])

  const handleDeleteTransaction = useCallback(async () => {
    await deleteTransaction(
      id,
      selectedDate.getMonth() + 1,
      selectedDate.getFullYear().toString()
    )

    addMessage({
      type: "success",
      title: "Parabéns",
      description: "Lançamento excluído com sucesso",
    })
    navigate("Dashboard")
  }, [selectedDate])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Feather name="chevron-left" size={24} color="#4169e1" />
        </BackButton>

        <EditButton
          onPress={() => {
            Editable(true)
          }}
        >
          <Feather name="edit" size={24} color="#4169e1" />
        </EditButton>

        <DeleteButton onPress={handleDeleteTransaction}>
          <Feather name="trash-2" size={24} color="#4169e1" />
        </DeleteButton>
      </Header>

      <Data>
        <Calendar>
          <CalendarHeader>
            {`Data Lançamento: ${format(
              selectedDate,
              "dd/MM/yyyy"
            ).toString()}`}
          </CalendarHeader>
          <Button
            onPress={handleToggleDatePicker}
            color="#4169e1"
            width="100%"
            enabled={editable}
          >
            Selecionar uma data
          </Button>
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
          disabled={!editable}
          dropDownStyle={{
            height: 60,
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 16,
            flex: 1,
            marginRight: 8,
            marginBottom: 8,
          }}
        />

        <Input
          ref={valueInputRef}
          name="value"
          icon="dollar-sign"
          editable={editable}
          placeholder="Valor"
          onChangeText={handleValueChange}
          onSubmitEditing={descriptionInputRef.current?.focus}
          value={value}
          returnKeyType="next"
          keyboardType="decimal-pad"
          containerStyle={{
            flex: 1,
            alignItems: "center",
          }}
        />

        <Input
          ref={descriptionInputRef}
          autoCapitalize="words"
          name="description"
          icon="book-open"
          editable={editable}
          placeholder="Descrição"
          keyboardType="default"
          onChangeText={handleDescriptionChange}
          onSubmitEditing={observationInputRef.current?.focus}
          value={description}
          returnKeyType="next"
        />

        <Input
          ref={observationInputRef}
          name="observation"
          icon="eye"
          editable={editable}
          placeholder="Observações"
          returnKeyType="done"
          keyboardType="default"
          onChangeText={handleObservationChange}
          value={observation}
          numberOfLines={5}
          textAlignVertical="top"
          multiline
          containerStyle={{
            height: 130,
            alignItems: "flex-start",
            paddingTop: 12,
          }}
        />

        <ComboBox
          data={categories}
          iconName="tag"
          selectionChange={handleCategoryChange}
          value={category}
          disabled={!editable}
          placeholder="Selecione uma categoria"
          dropDownStyle={{
            height: 60,
            backgroundColor: "#f8f8ff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 16,
            marginBottom: 8,
            flex: 1,
          }}
        />

        <Button
          onPress={handleUpdateTransaction}
          color="#3fd5c8"
          width="100%"
          enabled={editable}
        >
          Salvar Edições
        </Button>
      </Data>
    </Container>
  )
}

export default TransactionDetails
