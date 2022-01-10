import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
//import les ecrans
import Authstack from "../Auth";
import Appstack from "../App";
const RootStack = createNativeStackNavigator();

const index = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Authstack"
        component={Authstack}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Appstack"
        component={Appstack}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default index;
