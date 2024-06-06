import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import CreateTransaction from "../pages/CreateTransaction"
import TransactionDetails from "../pages/TransactionDetails"

const App = createNativeStackNavigator()

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#f5f5f5" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateTransaction" component={CreateTransaction} />
    <App.Screen name="TransactionDetails" component={TransactionDetails} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
)

export default AuthRoutes
