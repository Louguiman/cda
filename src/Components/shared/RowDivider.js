import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RowDivider = () => <View style={styles.rowDivider} />;

export default RowDivider;

const styles = StyleSheet.create({
  rowDivider: {
    height: 25,
    width: 1,
    backgroundColor: "white",
    marginLeft: 8,
  },
});
