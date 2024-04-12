import React, { useCallback, useMemo } from "react"
import { Feather } from "@expo/vector-icons"

import { Container, Title, Description, OkButton, OkButtonText } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { format } from "date-fns"
import ptBr from "date-fns/locale/pt-BR"

interface RouteParams {
  date: number
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation<any>()
  const { params } = useRoute()

  const routeParams = params as RouteParams

  const handleOkPressed = useCallback(() => {
    reset({ routes: [{ name: "Dashboard" }], index: 0 })
  }, [reset])

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd ' de ' MMMM ' de ' yyyy ' às ' HH:mm'h'",
      { locale: ptBr }
    )
  }, [routeParams.date])

  return (
    <Container>
      <Feather name="check" size={80} color="#04d361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed} style={{ borderRadius: 10 }}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  )
}

export default AppointmentCreated
