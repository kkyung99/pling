import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Pling</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    height: 65,
    paddingTop: 20,
    backgroundColor: "#AABCA6",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
