import React from "react";
import { View, Text, ImageBackground } from "react-native";

const MembreDetails = ({ route, navigation }) => {
  const { membre } = route.params;
  return (
    <View>
      <ImageBackground
        source={membre.photo}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
};

export default MembreDetails;
