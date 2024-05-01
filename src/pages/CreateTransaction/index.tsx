import { useCallback, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../hooks/auth"

import { Feather } from "@expo/vector-icons"

import { Form } from "@unform/mobile"
import { FormHandles } from "@unform/core"

import ComboBox from "../../components/ComboBox"

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Data,
} from "./styles"

const CreateTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [type, setType] = useState<string>("SAIDA")
  const { goBack, navigate } = useNavigation<any>()
  const { user } = useAuth()

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleAddTransaction = useCallback(() => {}, [])

  const handleTypeChange = useCallback(() => {}, [])

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
              marginTop: 16,
              marginLeft: 8,
              marginRight: 8,
              flex: 1,
            }}
          />
        </Data>
      </Form>
    </Container>
  )
}

export default CreateTransaction
