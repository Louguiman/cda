import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Touchableopacity,
  Dimensions,
  Text,
} from "react-native";
// import { TextInput } from "react-native-paper";

export default function input(props) {
  return (
    <View style={{ flex: 1 }}>
      {/* <TextInput
        placeholder={props.placeholder}
        mode="outlined"
        style={styles.User}
        outlineColor="red"
      /> */}
      <TextInput
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        secureTexEntry={props.password}
        style={styles.User}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  User: {
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 20,

    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 2,
    marginTop: 0,
  },
});
