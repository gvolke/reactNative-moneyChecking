import React from "react"
import { StatusBar, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"

import AppProvider from "./hooks"

import Routes from "./routes/index"

const Home: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" translucent />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
)

export default Home
