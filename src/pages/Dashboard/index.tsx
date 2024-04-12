import React, { useCallback, useEffect, useState } from "react"

import { Feather } from "@expo/vector-icons"

import api from "../../services/api"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../hooks/auth"

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from "./styles"

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([])

  const { user, signOut } = useAuth()
  const { navigate } = useNavigation<any>()

  useEffect(() => {
    api.get("providers").then((response) => {
      setProviders(response.data)
    })
  }, [setProviders])

  const navigateToProfile = useCallback(() => {
    navigate("Profile")
    //signOut()
  }, [navigate])

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate("CreateAppointment", { providerId })
    },
    [navigate]
  )

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

      <ProvidersList
        data={providers}
        ListHeaderComponent={
          <ProviderListTitle>Cabeileireiros</ProviderListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Feather name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Feather name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>08h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
        keyExtractor={(provider) => provider.id}
      />
    </Container>
  )
}

export default Dashboard
