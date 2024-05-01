import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import CreateTransaction from "../pages/CreateTransaction"
import AppointmentCreated from "../pages/AppointmentCreated"

const App = createNativeStackNavigator()

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#312e38" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateTransaction" component={CreateTransaction} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
)

export default AuthRoutes
