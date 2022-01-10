import React from "react";
import { View, Text, StyleSheet } from "react-native";

const detailEvent = () => {
  return (
    <View style={styles.contain}>
      <Text>detailEvent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default detailEvent;
