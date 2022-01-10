import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function headerLog(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/logo.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <Text style={styles.text} text={props.text}></Text> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // flex:1,
    justifyContent: "center",
    height: "65%",
    width: "90%",
    marginTop: 50,
    marginLeft: 20,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
