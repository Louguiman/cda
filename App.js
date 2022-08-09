import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import RootNavigation from "./src/Navigation/RootStack";
import { AuthProvider } from "./src/global/userContext";
const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
          <RootNavigation />
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
}
