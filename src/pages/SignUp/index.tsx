import React, { useCallback, useRef } from "react"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

import { Form } from "@unform/mobile"
import { FormHandles } from "@unform/core"
import * as Yup from "yup"
import api from "../../services/api"

import Input from "../../components/InputUnform"
import Button from "../../components/Button"

import logoImg from "../../assets/Logo.png"

import { Container, Title, BackToSignIn, BackToSignInText } from "./styles"

import { useMessage } from "../../hooks/message"

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const { addMessage } = useMessage()

  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "A senha deve ter no mínimo 6 dígitos"),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await api.post("/users", data)

        addMessage({
          type: "success",
          title: "Cadastro realizado com sucesso!",
          description: "Você já pode fazer login na aplicação",
        })

        navigation.goBack()
      } catch (err) {
        let yupError = ""

        if (err instanceof Yup.ValidationError) {
          yupError = err.inner[0].message + "."
        }

        addMessage({
          type: "error",
          title: "Erro no cadastro",
          description:
            "Ocorreu um erro ao fazer o cadastro, tente novamente. " + yupError,
        })
      }
    },
    [navigation]
  )

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
                color="#4169e1"
              >
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn
        onPress={() => {
          navigation.navigate("SignIn" as never)
        }}
      >
        <Feather name="arrow-left" size={20} color="#5b5b5b" />
        <BackToSignInText>Voltar para o logon</BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp
