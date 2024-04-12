import * as SplashScreen from "expo-splash-screen"
import { View } from "react-native"
import { useState, useEffect, useCallback } from "react"
import * as Font from "expo-font"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import {
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
} from "@expo-google-fonts/roboto-slab"

const fetchFonts = () => {
  return Font.loadAsync({
    "robotoslab-regular": RobotoSlab_400Regular,
    "robotoslab-medium": RobotoSlab_500Medium,
  })
}

import Home from "./src/Home"

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function loadApp() {
      try {
        await SplashScreen.preventAutoHideAsync()

        await fetchFonts()
      } catch (error) {
        console.error(error)
      } finally {
        setAppIsReady(true)
      }
    }

    loadApp()
  }, [])

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <>
      <GestureHandlerRootView onLayout={onLayout} style={{ flex: 1 }}>
        <Home />
      </GestureHandlerRootView>
    </>
  )
}
